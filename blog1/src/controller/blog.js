const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `; //where 1=1 占位 兜底 避免author和keyword都没有 语句报错
    if (author) {
        sql += `and author='${author}'`
    } 
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc`;
    return exec(sql);
}

const getDetail = (id) => {
    let sql = `select * from blogs where id="${id}";`;
    return exec(sql);
}

const newBlog = (blogData ={}) => {
    //处理后插入到数据库中
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createtime = Date.now();
    
    const sql = `
         insert into blogs (title, content, createtime, author)
         values ('${title}', '${content}', '${createtime}', '${author}')
     `
    return exec(sql).then( insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const upDate = (id, blogData = {}) => {
    const { title, content } = blogData;

    const sql = `update blogs set title="${title}", content="${content}" where id="${id} "`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true;
        }
        return false;
    }) ;
}

const delBlog = (id, delData) => {
    const { author } = delData;
    const sql = `delete from blogs where id=${id} and author="${author}"`
    
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
