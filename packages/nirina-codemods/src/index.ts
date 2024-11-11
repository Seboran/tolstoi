import type {
  API,
  ArrayExpression,
  FileInfo,
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
              dirtyFlag = true
            }
          }
        })
      }
    })

    // Add import { ref } from 'vue' if data was transformed
    if (hasDataTransformed) {
      const importDeclaration = j.importDeclaration(
        [j.importSpecifier(j.identifier('ref'))],
        j.literal('vue'),
      )
      root.get().node.program.body.unshift(importDeclaration)
      dirtyFlag = true
    }

    return root.toSource()
  }

  const scriptTagRegex = /(<script[^>]*>)([\s\S]*?)(<\/script>)/gm

  return file.source.replace(
    scriptTagRegex,
    (_match, openingTag, scriptContent, closingTag) => {
      // Transform the extracted JavaScript content from <script> tags
      const transformedScriptContent = transformCode(scriptContent)
      // Replace the original <script> content with the transformed content, preserving the original opening tag
      return `<script setup>\n${transformedScriptContent}\n</script>`
    },
  )
}
