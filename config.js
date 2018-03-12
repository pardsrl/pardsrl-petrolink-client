const config = {
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 9000
  },
  sensors: {
    file: process.env.DATAFILE || './example/test.txt',
    wits0: {
      t: '99',
      hta: '14',
      anem: '45',
      bpozo: '22',
      llave: '46',
      haparejo: '12',
      piza: '47',
      pistoneo: '48',
      embolada: '23',
      torque: '18'

    }
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    queue: process.env.QUEUE || 'streams',
    channel: process.env.CHANNEL || 'packet recv'
  }
}

module.exports = config
