#!/usr/bin/env node

const yargs = require('yargs')
const { grow } = require('./commands/grow')

yargs
  .scriptName('bonsai')
  .usage('$0 <cmd> [args]')
  .command('grow [name]', 'create new project from template', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      describe: 'The project name'
    })
  }, function (argv) {
    grow(argv)
  })
  .help()
  .argv
