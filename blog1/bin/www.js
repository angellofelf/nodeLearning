const http = require('http')

const PORT = 9999;

const  serverHandle = require('../app');
const server = http.createServer(serverHandle);

server.listen(PORT);

console.log('server is runing on '+PORT)