import jscodeshift, { type API } from 'jscodeshift'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import transform from './index.js'
import { join } from 'node:path'

const buildApi = (parser: string | undefined): API => ({
  j: parser ? jscodeshift.withParser(parser) : jscodeshift,
  jscodeshift: parser ? jscodeshift.withParser(parser) : jscodeshift,
  stats: () => {
    console.error('The stats function was called, which is not supported on purpose')
  },
  report: () => {
    console.error('The report function was called, which is not supported on purpose')
  },
})

try {
  const firstArgument = process.argv.at(2)
  console.debug(firstArgument)

  if (!firstArgument) {
    throw 'Please set a target'
  }

  const files = await readdir(firstArgument, { recursive: true })
  const vueFiles = files.filter((file) => /.*\.vue$/.test(file))
  vueFiles.forEach(async (file) => {
    const writePath = join(firstArgument, file)
    const transformedVueScripts = transform(
      { source: await readFile(writePath, 'utf-8'), path: file },
      buildApi('tsx'),
      {},
    )
    console.debug(writePath)
    await writeFile(writePath, transformedVueScripts)
  })
  console.log(vueFiles)
} catch (err) {
  console.error(err)
}
