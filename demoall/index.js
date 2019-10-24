const http = require('http')
const querystrig = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = querystrig.parse(url.split('?')[1]);

    res.setHeader('Content-type', 'application/json');

    const resData = {
        method,
        url,
        path,
        query
    }

    if(method === 'GET') {
        res.end(
            JSON.stringify(resData)
        )
    }

    if(method === 'POST') {
        let postData = '';
        req.on('data', chunk => {
            postData += chunk;
        })
        req.on('end', () => {
            resData.postData = postData;
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})

server.listen(9999);
console.log('server is running on 9999 ')


// 收集和整理前端发来的信息，并返回新的信息