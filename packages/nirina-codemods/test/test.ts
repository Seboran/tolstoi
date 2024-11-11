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
  it('test #1', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture1.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture1.output.vue'),
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

  it('test #2', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture2.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture2.output.vue'),
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

  it('test #3', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture3.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture3.output.vue'),
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

  it('test #4', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture4.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture4.output.vue'),
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

  it('test #5', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture5.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture5.output.vue'),
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

  it('test #6', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture6.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture6.output.vue'),
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

  it('test #7', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture7.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture7.output.vue'),
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

  it('test #8', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture8.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture8.output.vue'),
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
  
  it('test #9', async () => {
    const INPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture9.input.vue'),
      'utf-8',
    )
    const OUTPUT = await readFile(
      join(__dirname, '..', '__testfixtures__/fixture9.output.vue'),
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
