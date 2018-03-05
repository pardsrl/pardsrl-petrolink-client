
'use strict'

const fs = require('fs')
const chalk = require('chalk')
const debug = require('debug')('pardsrl-petrolink:index')
const chokidar = require('chokidar')

const Client = require('./Client')
const { parseToWits } = require('./lib')

/* Client connection */
/* --------------------------------------------- */

let client = new Client({
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 9000
})

let clientConnected = false

let dataFileWatcher = chokidar.watch(process.env.DATAFILE)

dataFileWatcher.on('change', (file) => {
  debug(chalk.yellow('FILE'),`File ${file} has changed`)

  if (clientConnected) {
    fs.readFile(file, 'utf8', async (err, data) => {
      if (err) handleError(err)

      let witsPacket = await parseToWits(data).catch(handleError)
      witsPacket && client.write(witsPacket)
    })
  }
})

client.on('connect', () => {
  clientConnected = true
})

client.on('error', () => {
  clientConnected = false
})

function handleError (err) {
  debug(`[Error] ${err.message}`)
}

client.connect()
