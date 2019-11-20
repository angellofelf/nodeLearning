const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

//创建链接对象
const con = mysql.createConnection(MYSQL_CONF);

//开始链接
con.connect();

//统一执行sql语句的函数

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return ;
            }
            resolve(result)
        })
    })
}

function escape(str) {
    if (!str) return;
    return mysql.escape(str);
}

module.exports = {
    exec,
    escape: escape
}