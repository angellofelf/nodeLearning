
const { 
    getList, 
    getDetail,
    newBlog,
    upDate,
    delBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resMoel')


//统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
}
const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
       

       let author = req.query.author || '';
       const keyword = req.query.keyword || '';
    if (req.query.isadmin) {
        //管理员界面
        const loginResult = loginCheck(req);
        if (loginResult) {
             return loginResult
        }
        author = req.session.username;
    }
    //强制查询自己的博客
       const result = getList(author, keyword);
    //    return new SuccessModel(listData );
       return result.then( listdata => {
           return new SuccessModel(listdata);
       })
    }

    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const loginResult = loginCheck(req);
        if (loginResult) {
             return loginResult
        }

        const result = getDetail(id);

        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    //新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const loginResult = loginCheck(req);
        if (loginResult) {
             return loginResult
        }
        //假数据的author
        req.body.author = req.session.username;
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data) ;
        })
    }

    //更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginResult = loginCheck(req);
        if (loginResult) {
             return loginResult
        }
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
        const loginResult = loginCheck(req);
        if (loginResult) {
             return loginResult
        }
        //假数据的author
        req.body.author = req.session.username;
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