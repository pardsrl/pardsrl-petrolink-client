'use strict'

// Wits General time based record
let record = '01'

// Wits channels
let pardToWits = {
  'hta': '01',
  'anem': '02',
  'bpozo': '03',
  'llave': '04',
  'haparejo': '05'
}

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

    for (const key in pardJSON) {
      if (pardJSON.hasOwnProperty(key)) {
        const value = pardJSON[key]
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
