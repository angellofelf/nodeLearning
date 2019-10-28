const mysql = require('mysql') 

//创建链接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
})

//开始linajie
con.connect();

//执行sql语句


const sql = 'select * from users';
// const sql = 'insert into users(username, `password`, realname) values("wangwu", "123", "王五");' //插入返回一个对象，里面带一个insertId
// const sql = 'update users set realname="李四2" where username="lisi";' //修改 返回一个对象，里面有changedRows和affectRows
// const sql = 'delete from users where id="4";' //删除 返回一个对象，里面有changedRows和affectRows
con.query(sql, (err, result) => {
   if (err) {
       console.error(err);
       return ;
   }
   console.log(result);
})

//关闭链接
con.end(); 