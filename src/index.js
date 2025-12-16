import { readFileSync } from 'node:fs'
import path from 'node:path'
import _ from 'lodash'

const formatValue = value => value

export default function gendiff(filepath1, filepath2) {
  const path1 = path.resolve(process.cwd(), filepath1)
  const path2 = path.resolve(process.cwd(), filepath2)

  const file1 = readFileSync(path1, 'utf-8')
  const file2 = readFileSync(path2, 'utf-8')

  const data1 = JSON.parse(file1)
  const data2 = JSON.parse(file2)

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort()

  const lines = keys.flatMap((key) => {
    const hasKey1 = Object.hasOwn(data1, key)
    const hasKey2 = Object.hasOwn(data2, key)

    if (!hasKey1) {
      return `  + ${key}: ${formatValue(data2[key])}`
    }

    if (!hasKey2) {
      return `  + ${key}: ${formatValue(data1[key])}`
    }

    if (data1[key] === data2[key]) {
      return `    ${key}: ${formatValue(data1[key])}`
    }

    return [
      `  - ${key}: ${formatValue(data1[key])}`,
      `  + ${key}: ${formatValue(data2[key])}`,
    ]
  })

  return ['{', ...lines, '}'].join('\n')
}
