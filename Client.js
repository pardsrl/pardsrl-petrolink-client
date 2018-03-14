'use strict'

const net = require('net')
var NetSocket = require('net-keepalive')

const EventEmitter = require('events')
const debug = require('debug')('pardsrl-petrolink:client')
const chalk = require('chalk')

class Client extends EventEmitter {
  constructor (config) {
    super()
    this._config = config
    this._client = new net.Socket()
    this._intervalConnect = false

    this._client.on('connect', () => {
      //enable keep alive and start probing after 1 second of inactivity
      this._client.setKeepAlive(true,1000)
      //after initialDuration send probes every 1 second
      NetSocket.setKeepAliveInterval(this._client, 1000) 
      //after 10 failed probes connection will be dropped
      NetSocket.setKeepAliveProbes(this._client, 10)

      this.clearIntervalConnect()
      debug(`${chalk.green('[TCP]')}`, 'connected to server')
      this.emit('connect')
      // this._client.write('CLIENT connected');
    })

    this._client.on('error', (err) => {
      this._client.end();
      debug(`${chalk.red('[TCP ERROR]')}`, err.message)
      this.launchIntervalConnect()
      this.emit('error')
    })
    this._client.on('close', (err) => {
      debug(`${chalk.red('[TCP CLOSE]')}`, err)
      this.launchIntervalConnect()
      this.emit('close')
    })
    this._client.on('end', (err) => {
      debug(`${chalk.red('[TCP END]')}`, err)
      this.launchIntervalConnect()
      this.emit('end')
    })


    this._client.on('timeout', () => {
      debug(`${chalk.red('[SOCKET TIMEOUT]')}`)
      this._client.end();
    });
  }

  connect () {
    debug(`${chalk.yellow('[TCP]')}`, 'Client Trying to connect')

    this._client.connect({
      host: this._config.host,
      port: this._config.port
    })
  }

  write (data) {
    debug(`${chalk.green('[OK]')} Writing data to server!`)
    this._client.write(data.replace(/ /g, ''))
  }

  launchIntervalConnect () {
    if (this._intervalConnect !== false) return
    this._intervalConnect = setInterval(() => this.connect(), 5000)
  }

  clearIntervalConnect () {
    if (this._intervalConnect === false) return
    clearInterval(this._intervalConnect)
    this._intervalConnect = false
  }
}

module.exports = Client
