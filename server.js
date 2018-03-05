const net = require('net')
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected')
  c.on('end', () => {
    console.log('client disconnected')
  })
  c.write('hello\r\n')
  c.pipe(c)

  c.on('data', (buffer) => console.log(buffer))
})

server.listen(9000, '0.0.0.0', () => {
  console.log('server bound')
})
