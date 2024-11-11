import type {
  API,
  ArrayExpression,
  FileInfo,
  FunctionExpression,
  Identifier,
  Options,
} from 'jscodeshift'

// https://go.codemod.com/ae6W633
export default function transform(file: FileInfo, api: API, options?: Options) {
  const j = api.jscodeshift

  function transformCode(source: string) {
    const root = j(source)
    let dirtyFlag = false
    let hasDataTransformed = false

    // Find the export default object
    root.find(j.ExportDefaultDeclaration).forEach((path) => {
      const declaration = path.value.declaration
      if (j.ObjectExpression.check(declaration)) {
        const properties = declaration.properties
        properties.forEach((prop) => {
          // Convert data properties to refs
          if (
            j.ObjectProperty.check(prop) &&
            (prop.key as Identifier).name === 'data'
          ) {
            const dataFunction = prop.value
            if (
              j.ArrowFunctionExpression.check(dataFunction) &&
              j.ObjectExpression.check(dataFunction.body)
            ) {
              const dataProperties = dataFunction.body.properties
              dataProperties.forEach((dataProp) => {
                if (j.ObjectProperty.check(dataProp)) {
                  const key = (dataProp.key as Identifier).name
                  const value = dataProp.value
                  // Create a ref declaration for each data property
                  const refDeclaration = j.variableDeclaration('const', [
                    j.variableDeclarator(
                      j.identifier(key),
                      j.callExpression(j.identifier('ref'), [
                        value as ArrayExpression,
                      ]),
                    ),
                  ])
                  // Insert the ref declaration at the top level
                  root.get().node.program.body.unshift(refDeclaration)
                  hasDataTransformed = true
                }
              })
              // Remove the data property from the export default object
              declaration.properties = properties.filter((p) => p !== prop)

              // Remove export default if empty
              if (declaration.properties.length === 0) {
                path.prune()
              }

              dirtyFlag = true
            }
          }
        })
      }

      if (path.node.declaration) {
        const properties = path.node.declaration.properties

        // Extract props
        const props = properties.find((prop) => prop.key.name === 'props')
        if (props) {
          const definePropsCall = j.callExpression(
            j.identifier('defineProps'),
            [j.objectExpression(props.value.properties)],
          )
          const definePropsDeclaration = j.variableDeclaration('const', [
            j.variableDeclarator(j.identifier('props'), definePropsCall),
          ])
          path.insertBefore(definePropsDeclaration)
          dirtyFlag = true
        }
      }
    })

    // Transform methods to standalone functions
    root.find(j.ExportDefaultDeclaration).forEach((path) => {
      const properties = path.value.declaration.properties
      properties.forEach((prop) => {
        if (j.ObjectProperty.check(prop) && prop.key.name === 'methods') {
          const methodsObject = prop.value
          if (j.ObjectExpression.check(methodsObject)) {
            methodsObject.properties.forEach((methodProp) => {
              if (j.ObjectProperty.check(methodProp)) {
                const key = methodProp.key.name
                const func = methodProp.value as FunctionExpression

                const standaloneFunction = j.functionDeclaration(
                  j.identifier(key),
                  func.params,
                  func.body,
                  func.async,
                )

                // Replace `this.property` with `property.value`
                j(standaloneFunction)
                  .find(j.MemberExpression, {
                    object: { type: 'ThisExpression' },
                  })
                  .replaceWith((memberPath) => {
                    if (j.Identifier.check(memberPath.node.property)) {
                      return j.memberExpression(
                        j.identifier(memberPath.node.property.name),
                        j.identifier('value'),
                      )
                    }
                    return memberPath.node
                  })

                if (func.async) {
                  standaloneFunction.generator = false
                  standaloneFunction.async = true
                }
                // Ensure the function is not a generator
                j(path).insertBefore(standaloneFunction)
                dirtyFlag = true
              }
            })
          }
        }
      })
    })

    // Remove the original export default object if transformations were made
    if (dirtyFlag) {
      root.find(j.ExportDefaultDeclaration).remove()
    }

    // Add import { ref } from 'vue' if data was transformed
    if (hasDataTransformed) {
      const importDeclaration = j.importDeclaration(
        [j.importSpecifier(j.identifier('ref'))],
        j.literal('vue'),
      )
      root.get().node.program.body.unshift(importDeclaration)
      dirtyFlag = true
    }

    return dirtyFlag ? root.toSource() : undefined
  }

  const scriptTagRegex = /(<script[^>]*>)([\s\S]*?)(<\/script>)/gm

  return file.source.replace(
    scriptTagRegex,
    (_match, openingTag, scriptContent, closingTag) => {
      // Transform the extracted JavaScript content from <script> tags
      const transformedScriptContent = transformCode(scriptContent)
      // Replace the original <script> content with the transformed content, preserving the original opening tag
      return `${openingTag.replace('>', ' setup>')}\n${transformedScriptContent}\n${closingTag}`
    },
  )
}
