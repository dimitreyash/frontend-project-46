import _ from 'lodash'

const isObject = value => _.isPlainObject(value)

export default function buildDiff(obj1, obj2) {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  return keys.map((key) => {
    const has1 = _.has(obj1, key)
    const has2 = _.has(obj2, key)

    if (!has1) {
      return { key, type: 'added', value: obj2[key] }
    }
    if (!has2) {
      return { key, type: 'removed', value: obj1[key] }
    }

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (isObject(value1) && isObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) }
    }

    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 }
    }

    return { key, type: 'changed', oldValue: value1, newValue: value2 }
  })
}
