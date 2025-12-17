import yaml from 'js-yaml'

const parse = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
}

const parser = (data, format) => parse[format](data)
export default parser
