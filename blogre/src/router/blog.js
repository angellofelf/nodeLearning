const { getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
 } = require('../controller/blog')
const { 
    SuccessModal,
    ErrorModal,
 } = require('../model/resModel')


const handleBlogRouter = (req, res) => {
    const method = req.method;
  

    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';

        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModal(listData);
        })
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
       const id = req.query.id;
       const result = getDetail(id)
       return result.then(data => {
           return new SuccessModal(data)
       })
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body;
        req.body.author = 'zhangsan';
        const result = newBlog(blogData);
        return result.then(data => {
            return new SuccessModal(data)
        })
    }
    
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body) ;
        return result.then(val => {
            if (val) {
                return new SuccessModal();
            } else {
                return new ErrorModal('更新博客失败');
            }
        })
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
         req.body.author = 'zhangsan';
         const result = delBlog(id, req.body.author);

         return result.then(val => {
             if (val) {
                 return new SuccessModal();
             } else {
                 return new ErrorModal('删除博客失败');
             }
         })
    }
}

module.exports = handleBlogRouter; 