import makePlain from './plain.js'
import makeStylish from './stylish.js'
import makeJson from './json.js'

export default function formatter(tree, format) {
  switch (format) {
    case 'stylish':
      return makeStylish(tree)

    case 'plain':
      return makePlain(tree)

    case 'json':
      return makeJson(tree)

    default:
      throw new Error(`Unknown format: ${format}`)
  }
}
