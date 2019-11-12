const quertString = require('querystring')

const handleBlogRouter = require('./src/route/blog')
const handleUserRouter = require('./src/route/user')
const { get, set } = require('./src/db/redis')
// session
// const SESSION_DATA = {};

//设置cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

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
    console.log(req.query)
    //解析 cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) return ;
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();//quchucookie自己加的空格，不然前端写的cookie会覆盖后端的，因为后端的在后边就会有空格
        req.cookie[key] = val; 
    })
    // 解析session
    // let needSetCookie = false;
    // let userId = req.cookie.userid; 
    // if (userId) {
    //     if(!SESSION_DATA[userId]){
    //         SESSION_DATA[userId] = {};
    //     }
    // } else {
    //     needSetCookie = true;
    //     userId =`${Date.now()}_${Math.random}` ;
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];

    // 解析session (使用redis)
    let needSetCookie = false;
    let userId = req.cookie.userid; 
    if (!userId) {
        needSetCookie = true;
        userId =`${Date.now()}_${Math.random}` ;
        //初始化 redis 中的 session值
        set(userId, {})
    }
    //获取session
    req.sessionId = userId;
    get(req.sessionId).then( sessionData => {
        if (sessionData == null) {
            //初始化 redis 中的session
            set(req.sessionId, {})
            //设置session;
            req.session = {}
        } else {
            req.session = sessionData;
        }
       console.log('req.session is ' ,req.session);
       //将两个promise连接起来,  //处理postData 
       return getPostData(req) ;
    }).then( postData => {
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
                    if(needSetCookie) res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                        res.end(
                            JSON.stringify(blogData)
                        )
                    }
            })
            return ;
        }
        //处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
               if(needSetCookie) res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                res.end(
                    JSON.stringify(userData)
                )
            })
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