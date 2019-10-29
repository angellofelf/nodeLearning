
const { 
    getList, 
    getDetail,
    newBlog,
    upDate,
    delBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resMoel')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {

       const author = req.query.author || '';
       const keyword = req.query.keyword || '';

       const result = getList(author, keyword);
    //    return new SuccessModel(listData );
       return result.then( listdata => {
           return new SuccessModel(listdata);
       })
    }

    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        
        const result = getDetail(id);

        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    //新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        //假数据的author
        req.body.author = 'zhangsan';
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data) ;
        })
    }

    //更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = upDate(id, req.body);

        return result.then( val => {
            if (val) {
                return new SuccessModel(val);
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    //删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        //假数据的author
        req.body.author = 'zhangsan';
       const result = delBlog(id, req.body);
       
       return result.then( val => {
        if (val) {
            return new SuccessModel(val);
        } else {
            return new ErrorModel('删除博客失败')
        }
    })
    }
}

module.exports = handleBlogRouter;