const queryString = require('querystring');

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user') 

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return ;
        }
        if (req.headers['Content-type'] !== 'application/json') {
            resolve({});
            return ;
        }

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return ;
            }
            resolve(postData);
            return ;
        })
    })
}

const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json');
    
    //获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query 处理get数据
    req.query = queryString.parse(url.split('?')[1]);
    
    //处理postdata
    getPostData(req).then(postData => {
        req.body = postData;
        
          //处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })

            return ;
        }
        
        //处理uset路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return ;
        }
        
        //未命中路由，返回404
        res.writeHead(404, {'Content-type': "text/plain"})
        res.wriete("404 NOT FOUND\n")
        res.end();
        })
  
}


module.exports = serverHandle;