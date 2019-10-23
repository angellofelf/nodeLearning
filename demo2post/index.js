const http = require('http')

const server = http.createServer((req, res) => {
    if(req.method === 'POST') {
        console.log('content-type: ' , req.headers['content-type']);

        //接收数据
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            console.log('postData: ', postData);
        })
    }
})

server.listen(9000);
console.log('server is runing on 9000')