import { readFileSync } from 'node:fs'
import path from 'node:path'

export default function gendiff (filepath1, filepath2) {
    const path1 = path.resolve(process.cwd(), filepath1)
    const path2 = path.resolve(process.cwd(), filepath2)

    const file1 = readFileSync(path1, 'utf-8')
    const file2 = readFileSync(path2, 'utf-8')

    const data1 = JSON.parse(file1)
    const data2 = JSON.parse(file2)
}