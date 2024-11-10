// source https://go.codemod.com/ae6W633

export default function transform(
  file: { source: any },
  api: { jscodeshift: any },
  options: any,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let dirtyFlag = false
  let hasDataTransformed = false

  // Find the export default object
  root
    .find(j.ExportDefaultDeclaration)
    .forEach((path: { value: { declaration: any } }) => {
      const declaration = path.value.declaration
      if (j.ObjectExpression.check(declaration)) {
        const properties = declaration.properties
        properties.forEach((prop: { key: { name: string }; value: any }) => {
          if (j.ObjectProperty.check(prop) && prop.key.name === 'data') {
            const dataFunction = prop.value
            if (
              j.ArrowFunctionExpression.check(dataFunction) &&
              j.ObjectExpression.check(dataFunction.body)
            ) {
              const dataProperties = dataFunction.body.properties
              dataProperties.forEach(
                (dataProp: { key: { name: any }; value: any }) => {
                  if (j.ObjectProperty.check(dataProp)) {
                    const key = dataProp.key.name
                    const value = dataProp.value
                    // Create a ref declaration for each data property
                    const refDeclaration = j.variableDeclaration('const', [
                      j.variableDeclarator(
                        j.identifier(key),
                        j.callExpression(j.identifier('ref'), [value]),
                      ),
                    ])
                    // Insert the ref declaration at the top level
                    root.get().node.program.body.unshift(refDeclaration)
                    hasDataTransformed = true
                  }
                },
              )
              // Remove the data property from the export default object
              declaration.properties = properties.filter((p: any) => p !== prop)
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

  return dirtyFlag ? root.toSource() : undefined
}

export const parser = 'tsx'
