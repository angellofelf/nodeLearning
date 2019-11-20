const express = require('express');

//本次http请求实例
const app = express();

app.use((req, res, next) => {
    console.log('请求开始....', req.method, req.url);
    next();
})

app.use((req, res, next) => {
    req.cookie = {
        userid: 'abc123'
    }
    next();
})

app.use((req, res, next) => {
    setTimeout(() => {
        req.body = {
             a: 100,
             b: 200
        }
        next();
    }, 1000);
})

app.use('/api', (req, res, next) => {
   console.log('处理api路由');
   next();
})

app.get('/api', (req, res, next) => {
    console.log('处理 get/ api 路由')
    next();
})

app.post('/api', (req, res, next) => {
    console.log('处理 post / api 路有')
    next();
})

function loginCheck(req, res, next) {
    //   console.log('登陆成功')
    //   next();
    console.log('登陆失败')
    res.json({
        errno: -1,
        msg: '登陆失败'
    })
}
app.get('/api/get-cookie',loginCheck, (req, res, next) => {
     console.log('get api / get-cookie');
     res.json({
         errno: 0,
         data: req.cookie
     })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post api/ get-post-data');
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('404')
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})
app.listen(3000, () => {
    console.log('server is runing on port 3000')
})