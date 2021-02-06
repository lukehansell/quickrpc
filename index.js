#!/usr/bin/env node
const { program } = require('commander')
const run = require('./src/run')
program.version('0.0.1')

async function main() {
  program.command('run <directory>', { isDefault: true })
    .description('run the rpc handler for a specified directory')
    .option('-p, --port <port_number>', 'web port')
    .action(run)

  await  program.parseAsync(process.argv)
}

main()
