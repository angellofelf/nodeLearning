// //标准输入输出
// process.stdin.pipe(process.stdout)
// //pipe就是一个管道  stdin是输入的水桶 stdout是输出

// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         req.pipe(res)
//     }
// })

// server.listen(8000)

// //复制文件
// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'data.txt');
// const fileName2 = path.resolve(__dirname, 'data-copy.txt');

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);
// readStream.pipe(writeStream);

// readStream.on('data', chunk => {
//     console.log(chunk.toString())
// })
// readStream.on('end', (err) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log('copy done');
// })

//网络读取文件
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const fileName = path.resolve(__dirname, 'data.txt');
        const readStream = fs.createReadStream(fileName);
        readStream.pipe(res);
        readStream.on('end', (err) => {
            if (err) {
                console.error(err)
            }
            console.log('read done')
        })
    }
})
console.log('server is running 8000')
server.listen(8000);