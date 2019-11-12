const env = process.env.NODE_ENV; //获取环境参数 packgejson里配的

//配置 不同环境下的各种参数(s数据库 redis等等)

let MYSQL_CONF

if (env === 'dev') {

    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'production') {

    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}