const net = require('net')
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected')
  c.on('end', () => {
    console.log('client disconnected')
  })
  c.write('hello\r\n')
  c.pipe(c)

  c.on('data', (buffer) => console.log(buffer.toString('ascii')))
})
// server.on('error', (err) => {
//   throw err;
// });
server.listen(9000, '0.0.0.0', () => {
  console.log('server bound')
})

// var client = new net.Socket();
// client.connect(9000, '127.0.0.1', function() {
// 	console.log('Connected');
// 	client.write('Hello, server! Love, Client.');
// });

// client.on('data', function(data) {
// 	console.log('Received: ' + data);
// 	client.destroy(); // kill client after server's response
// });

// client.on('close', function() {
// 	console.log('Connection closed');
// });
