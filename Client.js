'use strict'

const net = require('net');
const debug = require('debug')('pardsrl-petrolink:client')


class Client {

    constructor(config){
        this._config = config
        this._client = new net.Socket()
        this._intervalConnect = false

        this._client.on('connect', () => {
            this.clearIntervalConnect()
            debug('TCP','connected to server')
            this._client.write('CLIENT connected');
        })

        this._client.on('error', (err) => {
            debug('[TCP ERROR]', err.code )
            this.launchIntervalConnect()
        })
        this._client.on('close', this.launchIntervalConnect)
        this._client.on('end', this.launchIntervalConnect)
    }

    connect() {
        debug('Client Trying to connect')
        
        this._client.connect({
            host: this._config.host,
            port: this._config.port
        })
    }
    
    launchIntervalConnect() {
        if(false != this._intervalConnect) return
        this._intervalConnect = setInterval(() => this.connect() , 5000)
    }
    
    clearIntervalConnect() {
        if(false == this._intervalConnect) return
        clearInterval(this._intervalConnect)
        this._intervalConnect = false
    }

}



module.exports = Client;