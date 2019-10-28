const quertString = require('querystring')

const handleBlogRouter = require('./src/route/blog')
const handleUserRouter = require('./src/route/user')


//用于处理 post data
const getPostData = (req) => {
    console.log(req.method, req.headers['content-type'])
    return new Promise((resolve, reject) => {
        if( req.method !== 'POST') {
            resolve({});
            return ;
        }  
        if(req.headers['content-type'] !== 'application/json') {
            resolve({});
            return ;
        } 
        let postData = '';
        req.on('data', chunk => {
            console.log(chunk)
            postData += chunk.toString();
        })
        req.on('end', () => {
            if(!postData) {
                resolve({});
                return ;
            }
            console.log('postdata', postData)
            resolve(
                JSON.parse(postData)
            )
        })

    })
}
const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json');

    //解析url
    const url = req.url;
    req.path = url.split('?')[0];

    //解析 query
    req.query = quertString.parse(url.split('?')[1]);
    
    //处理postData 
    getPostData(req).then( postData => {
        req.body = postData;
        //处理blog路由
        // const blogData = handleBlogRouter(req, res);
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return ;
        // }

        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (blogData) {
                        res.end(
                            JSON.stringify(blogData)
                        )
                    }
            })
            return ;
        }
        //处理user路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return ;
        }

        //未命中
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 NOT Fount\n");
        res.end();
        
    })
            
}

module.exports = serverHandle;


// env: process.env.NODE_ENV   