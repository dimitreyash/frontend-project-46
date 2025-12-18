#!/usr/bin/env node
import { Command } from 'commander'
import gendiff from '../src/index.js'

const program = new Command()

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const { format } = program.opts()
    console.log(gendiff(filepath1, filepath2, format))
  })

program.parse(process.argv)
