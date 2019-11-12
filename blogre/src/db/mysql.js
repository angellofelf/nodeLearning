const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')


//创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

//开始链接
con.connect()

//统一执行sql的函数
function exec(sql) {
   return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
        if (err) {
            reject(err);
            return ;
        }
        resolve(result) //这里的result在callback里面没发返回，需要传入一个callback，因此要用promise
    })
   })
}

//保持连接

module.exports = {
    exec,
}