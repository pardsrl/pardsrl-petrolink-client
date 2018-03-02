'use strict'

const debug = require('debug')('pardsrl-petrolink')
const Client = require('./Client');

/* Client connection */
/* --------------------------------------------- */

let client = new Client({
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 9000
})

client.connect()



