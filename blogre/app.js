const queryString = require('querystring');

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user') 
const { get, set } = require('./src/db/redis')
// const sessionData = { };

const getCookieExpires = () => {
    let d = Date.now();
    d = d.setTime(d.getTime()+24*60*60*1000);
    return d.toGMTString();
 }
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
    
    //解析cookie 
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return ;
        }
        const arr = item.split('=');
        const key = arr[0];
        const val = arr[1];
        req.cookie[key] = val;
    })

    //解析session
    // let needSetCookie = false;
    // let userId = req.cookie.userid;
    // if (userId) {
    //     if (!sessionData[userId]) {
    //         sessionData[userId] = {}
    //     }

    // } else {
    //     needSetCookie = true;
    //   userId = `${Date.now()}_${Math.random()*100}` 
    //   sessionData[userId] = {}
    // }
    // req.session = sessionData[userId];
    
    //解析session redis
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random*100}`;
        set(userId, {});
    } 
    req.sessionId = userId;
    get(req.sessionId).then(sessionData => {
        if (sessionData == nul) {
            set(req.sessionId, {})
            req.session = {};
        } else {
            req.session = sessionData
        }
        
        //连续的两个promises 可以连起来

    //处理postdata
        return getPostData(req);
    }).then(postData => {
        req.body = postData;
        
          //处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                //设置cookie里面的userid,为什么要设置呢，因为我们需要每一个访问过我们服务端的浏览器都带一个cookieid
               if (needSetCookie)  res.setHeader('Set-Cookie', `userid=${userId}; path=/; expires=${getCookieExpires()}; httpOnly;`)
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
                if (needSetCookie) res.setHeader('Set-Cookie', `userid=${userId}; path=/; expires=${getCookieExpires()}; httpOnly;`)
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