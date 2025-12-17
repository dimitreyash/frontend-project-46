import _ from 'lodash'

const INDENT_SIZE = 4
const isPlainObject = value => _.isPlainObject(value)

const toStringValue = (value) => {
  if (value === null) {
    return 'null'
  }

  return String(value)
}

const indentForSign = depth => ' '.repeat(depth * INDENT_SIZE - 2)
const indentForBracket = depth => ' '.repeat((depth - 1) * INDENT_SIZE)

const formatPair = (key, rendered) => (rendered === '' ? `${key}:` : `${key}: ${rendered}`)

const stringify = (value, depth) => {
  if (!isPlainObject(value)) {
    return toStringValue(value)
  }

  const indent = ' '.repeat(depth * INDENT_SIZE)
  const lines = _.sortBy(Object.entries(value), ([key]) => key).map(([key, val]) => {
    const rendered = stringify(val, depth + 1)
    return `${indent}${formatPair(key, rendered)}`
  })

  return ['{', ...lines, `${indentForBracket(depth)}}`].join('\n')
}

export default function stylish(diffTree) {
  const renderNodes = (nodes, depth) => {
    const baseIndent = indentForSign(depth)

    const line = (sign, key, value) => {
      const rendered = stringify(value, depth + 1)
      return `${baseIndent}${sign} ${formatPair(key, rendered)}`
    }

    const lines = []

    for (const node of nodes) {
      switch (node.type) {
        case 'nested':
          lines.push(`${baseIndent}  ${formatPair(node.key, renderNodes(node.children, depth + 1))}`)
          break

        case 'unchanged':
          lines.push(line(' ', node.key, node.value))
          break

        case 'added':
          lines.push(line('+', node.key, node.value))
          break

        case 'removed':
          lines.push(line('-', node.key, node.value))
          break

        case 'changed':
          lines.push(line('-', node.key, node.oldValue), line('+', node.key, node.newValue))
          break

        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    }

    return ['{', ...lines, `${indentForBracket(depth)}}`].join('\n')
  }

  return renderNodes(diffTree, 1)
}
