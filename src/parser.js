import yaml from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
}

export default function parser(data, format) {
  const parse = parsers[format]

  if (!parse) {
    throw new Error(`Unknown format: ${format}`)
  }

  return parse(data)
}
