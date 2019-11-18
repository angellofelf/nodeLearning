const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `; //where 1=1 占位 兜底 避免author和keyword都没有 语句报错
    if (author) {
        author = escape(author);
        sql += `and author=${author}`
    } 
    
    if (keyword) {
        console.log(escape('%'+keyword+'%')) 
        keyword = escape('%'+keyword+'%');
        sql += ` and title like ${keyword}`
    }
    sql += ` order by createtime desc`;
    console.log('查询的语句', sql)
    console.log('如果为空', escape(undefined))
    return exec(sql);
}

const getDetail = (id) => {
    id = escape(id)
    let sql = `select * from blogs where id=${id};`;
    return exec(sql);
}

const newBlog = (blogData ={}) => {
    //处理后插入到数据库中

    const title = escape(xss(blogData.title));
    const content = escape(xss(blogData.content));
    const author = escape(blogData.author);
    const createtime = Date.now();
    
    const sql = `
         insert into blogs (title, content, createtime, author)
         values (${title}, ${content}, ${createtime}, ${author})
     `
    return exec(sql).then( insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const upDate = (id, blogData = {}) => {
    let { title, content } = blogData;
    title = escape(title);
    content = escape(content);
    const sql = `update blogs set title=${title}, content=${content} where id=${id}`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true;
        }
        return false;
    }) ;
}

const delBlog = (id, delData) => {
    let { author } = delData;
    id = escape(id);
    author = escape(author);
    const sql = `delete from blogs where id=${id} and author=${author}`
    
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false ;
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    upDate,
    delBlog,
}
