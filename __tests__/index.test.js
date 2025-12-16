import gendiff from '../src/index.js'
import result from '../__fixtures__/result.js'
import { expect, test } from '@jest/globals'

test('check json', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(result)
})
