const net = require('net')
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected')
  c.write('hello\r\n')
  c.pipe(c)
  
  c.on('data',  (buffer) => { 
    console.log(
      '-----------PACKET RECEIVED------------\n',
      buffer.toString('ascii'),
      '\n-----------PACKET ENDED------------'
    )
  })
  
  c.on('end',   () => console.log('client disconnected'))
  c.on('error', () => console.log('client disconnected'))
})


server.listen(9000, '0.0.0.0', () => {
  console.log('server bound')
})
