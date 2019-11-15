//标准输入输出
process.stdin.pipe(process.stdout)
//pipe就是一个管道  stdin是输入的水桶 stdout是输出

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.pipe(res)
    }
})

server.listen(8000)