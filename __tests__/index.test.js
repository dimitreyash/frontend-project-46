import gendiff from '../src/index.js'
import result from '../__fixtures__/result.js'
import { expect, test } from '@jest/globals'

test('check json', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(result)
})
test('check yml', () => {
  expect(gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(result)
})

test('check yaml', () => {
  expect(gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml')).toEqual(result)
})
