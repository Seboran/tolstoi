import { describe, it } from 'vitest'
import jscodeshift, { type API } from 'jscodeshift'
import transform from '../src/index.js'
import assert from 'node:assert'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const buildApi = (parser: string | undefined): API => ({
  j: parser ? jscodeshift.withParser(parser) : jscodeshift,
  jscodeshift: parser ? jscodeshift.withParser(parser) : jscodeshift,
  stats: () => {
    console.error(
      'The stats function was called, which is not supported on purpose',
    )
  },
  report: () => {
    console.error(
      'The report function was called, which is not supported on purpose',
    )
  },
})

describe('vue/3/ref-transform', () => {
  const [_zero, ...numbers] = [...Array(11).keys()]
  it.each(numbers)('test #%d', async (number) => {
    const inputFilePath = join(
      __dirname,
      '..',
      `__testfixtures__/fixture${number}.input.vue`,
    )
    console.log('reading input file path ', inputFilePath)
    const INPUT = await readFile(inputFilePath, 'utf-8')
    const OUTPUT = await readFile(
      join(__dirname, '..', `__testfixtures__/fixture${number}.output.vue`),
      'utf-8',
    )

    const actualOutput = transform(
      {
        path: 'index.js',
        source: INPUT,
      },
      buildApi('tsx'),
      {},
    )

    assert.deepEqual(
      actualOutput?.replace(/W/gm, ''),
      OUTPUT.replace(/W/gm, ''),
    )
  })
})
