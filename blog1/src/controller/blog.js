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

const newBlog = (blogData) => {
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
    console.log('id', id);

    return true ;
}

const delBlog = (id) => {
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    upDate,
    delBlog,
}