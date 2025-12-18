import { readFileSync } from 'node:fs'
import path from 'node:path'
import parser from './parser.js'
import buildDiff from './buildDiff.js'
import format from './formatters/index.js'

export default function gendiff(filepath1, filepath2, formatName = 'stylish') {
  const path1 = path.resolve(process.cwd(), filepath1)
  const path2 = path.resolve(process.cwd(), filepath2)

  const file1 = readFileSync(path1, 'utf-8')
  const file2 = readFileSync(path2, 'utf-8')

  const format1 = path.extname(path1).slice(1)
  const format2 = path.extname(path2).slice(1)

  const data1 = parser(file1, format1)
  const data2 = parser(file2, format2)

  const diffTree = buildDiff(data1, data2)
  return format(diffTree, formatName)
}
