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
})
