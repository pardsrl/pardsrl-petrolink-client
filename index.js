
'use strict'

const chalk = require('chalk')
const debug = require('debug')('pardsrl-petrolink:index')

const Client = require('./Client')
const { parseToWits } = require('./lib')
const { server, sensors, redis} = require('./config')

const redisClient = require('redis').createClient({
  host: redis.host,
  port: redis.port
})

/* Socket Client connection */
/* --------------------------------------------- */

let client = new Client({
  host: server.host,
  port: server.port
})

let clientConnected = false

redisClient.on('connect', () => {
  debug(chalk.blue('[REDIS]'), 'Redis connected to server.')
})

function waitForPush () {
  if (clientConnected) {
    redisClient.brpop(redis.queue, 0, async (err, data) => {
      if (err) handleError(err)

      if (data) {
        debug(chalk.blue('[REDIS DATA]'), err, data)

        let objStream = data[1]

        let witsPacket = await parseToWits(objStream).catch(handleError)

        if (clientConnected) {
          witsPacket && client.write(witsPacket)
          waitForPush()
        } else {
          // No envío el paquete y lo dejo en una lista de perdidos para posterior control
          redisClient.lpush('lost', objStream)
        }
      }
    })
  }
}

client.on('connect', () => {
  clientConnected = true
  waitForPush()
})

client.on('error', () => {
  clientConnected = false
})

function handleError (err) {
  debug(`[Error] ${err.message}`)
}

client.connect()
