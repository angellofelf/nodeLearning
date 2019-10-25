const getList = (author, keyword) => {

    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1571974161424,
            author: author,
        },
        {
            id: 2,
            title: '标题A',
            content: '内容A',
            createTime: 1571974161424,
            author: author,
        },
        {
            id: 3,
            title: '标题A',
            content: '内容A',
            createTime: 1571974161424,
            author: author,
        },
        {
            id: 4,
            title: '标题A',
            content: '内容A',
            createTime: 1571974161424,
            author: author,
        },
        {
            id: 5,
            title: '标题A',
            content: '内容A',
            createTime: 1571974161424,
            author: author,
        },
    ]
}

const getDetail = (id) => {
    return {
        id: id,
        title: '标题',
        content: '内容',
        createTime: 1571974161424,
        author: 'author'
    }
}

const newBlog = (blogData) => {
    //处理后插入到数据库中
    console.log('newBlogData', blogData = {} )
    return {
        id: 0000001,
    }
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