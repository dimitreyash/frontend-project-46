import _ from 'lodash'

const isObject = value => _.isPlainObject(value)

const formatValue = (value) => {
  if (isObject(value) || Array.isArray(value)) {
    return '[complex value]'
  }
  if (value === null) {
    return 'null'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

export default function plain(diffTree) {
  const renderNodes = (nodes, parentPath) => {
    const lines = []
    const makePath = key => (parentPath ? `${parentPath}.${key}` : key)

    for (const node of nodes) {
      const fullPath = makePath(node.key)

      switch (node.type) {
        case 'nested':
          lines.push(renderNodes(node.children, fullPath))
          break

        case 'unchanged':
          break

        case 'added':
          lines.push(`Property '${fullPath}' was added with value: ${formatValue(node.value)}`)
          break

        case 'removed':
          lines.push(`Property '${fullPath}' was removed`)
          break

        case 'changed':
          lines.push(
            `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`,
          )
          break

        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    }

    return lines.join('\n')
  }

  return renderNodes(diffTree, '')
}
