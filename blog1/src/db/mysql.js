const mysql = require('mysql') 
const { MYSQL_CONF } = require('../conf/db')

//创建链接对象
const con = mysql.createConnection(MYSQL_CONF);

//开始链接
con.connect();

//执行sql的函数

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err){
                reject(err);
                return ;
            }
            resolve(result);
        })
    })
}

//不用关闭在这里
module.exports = {
    exec,
}