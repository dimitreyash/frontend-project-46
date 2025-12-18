import { readFileSync } from 'node:fs'
import path from 'node:path'
import gendiff from '../src/index.js'
import { describe, expect, test } from '@jest/globals'

const getFixturePath = name => path.resolve(process.cwd(), '__fixtures__', name)
const readFixture = name => readFileSync(getFixturePath(name), 'utf-8')

describe('gendiff', () => {
  test.each(['json', 'yml'])('nested %s', (ext) => {
    const file1 = getFixturePath(`file1.${ext}`)
    const file2 = getFixturePath(`file2.${ext}`)
    const expected = readFixture('resultStylish.txt')

    expect(gendiff(file1, file2)).toEqual(expected.trimEnd())
  })

  test.each(['json', 'yml'])('nested plain %s', (ext) => {
    const file1 = getFixturePath(`file1.${ext}`)
    const file2 = getFixturePath(`file2.${ext}`)
    const expected = readFixture('resultPlain.txt')

    expect(gendiff(file1, file2, 'plain')).toEqual(expected.trimEnd())
  })

  test.each(['json', 'yml'])('nested json %s', (ext) => {
    const file1 = getFixturePath(`file1.${ext}`)
    const file2 = getFixturePath(`file2.${ext}`)

    const expected = JSON.parse(readFixture('resultJson.json'))
    const result = JSON.parse(gendiff(file1, file2, 'json'))

    expect(result).toEqual(expected)
  })

  test('throws error for unknown format', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    expect(() => gendiff(file1, file2, 'unknown')).toThrow()
  })
})
