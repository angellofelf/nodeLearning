const { exec }  = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 ` ;
    if (author) {
        sql += `and author = ${author}`
    };
    if (keyword) {
        sql += `and keyword = ${keyword}`
    }
    sql += 'order by createtime desc'
    //返回的是一个promise
    return exec(sql)
}

const getDetail = (id) => {
    //先返回假数据
    const sql = `select * from blogs where id='${id}'`;
    return exec(sql).then(rows => {
        return rows[0] || {};
    })
    //查询结果是数组，但是只有一个元素，所以把他变成对象
 }


const newBlog = (blogData ={}) => {
    const { title, author, content } = blogData;
    const createtime = Date.now();
    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', '${createtime}', '${author}')
    `;
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData;
    const sql = `
        update blogs set title='${title}', content='${content}' where id='${id}'
    `;

    return exec(sql).then(updateData => {
        if (updateData.affectRows > 0) {
            return true;
        }

        return false ;
    })
}

const delBlog = (id, author) => {
     const sql = `delete from blogs where id='${id}' and author='${author}'` ;
     return exec(sql).then(delData => {
         if (delData.affectRows > 0) {
             return true;
         }
         return false;
     })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
}