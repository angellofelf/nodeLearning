const redis = require('redis');

//创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1'); //post host(主机))
redisClient.on('error', err => {
    console.error(err)
})


//测试
redisClient.set('myname', 'manman', redis.print);
redisClient.get('myname', (err, val) => {
    if (err) {
        console.error(err);
        return ;
    }
    console.log('val is', val);

    //推出
    redisClient.quit();
})