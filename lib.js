'use strict'

const { sensors} = require('./config')


// Wits General time based record
let record = '01'

// Wits channels
let pardToWits = sensors.wits0

/**
 * Convert pardsrl json data to wits representation
 * @param {*} pardJSON Json data from pardsrl notation
 */
function parseToWits (pardJSON) {
  return new Promise((resolve, reject) => {
    if (typeof pardJSON === 'string') {
      pardJSON = JSON.parse(pardJSON)
    }

    let elements = []

    let data = pardJSON[0]

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key]
        const channel = pardToWits[key]
        channel && elements.push(`${record}${channel}${value}`)
      }
    }

    let witsPacket = `&&\n${elements.join('\n')}\n!!`

    resolve(witsPacket)
  })
}

module.exports = {
  parseToWits
}
