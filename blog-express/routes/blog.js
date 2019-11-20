const express = require('express');
const router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    upDate,
    delBlog
} = require('../controller/blog');
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');

const loginCheck = require('../middleware/loginCheck')




router.get('/list', function(req, res, next) {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // 管理员界面
    if (req.query.isadmin) {
        if (req.session.username == null) {
             res.json(
                 new ErrorModel('未登录')
             )
             return ;
        }
    }
    const result = getList(author, keyword);
    return result.then( listData => {
        res.json(new SuccessModel(listData))
    })
})

router.get('/detail', function(req, res, next) {
   const result = getDetail(req.query.id);
   return result.then(data => {
       res.json(new SuccessModel(data[0]))
   })
})

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data => {
        res.json(new SuccessModel(data))
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    req.body.author = req.session.username;
    const result = upDate(req.query.id, req.body);
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel(val))
        } else {
            res.json(new ErrorModel('更新博客失败'))
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    //没获取腌auhtor
    req.body.author = req.session.username;
    const result = delBlog(req.query.id, req.body);

    return result.then(val => {
        if (val) {
            res.json(new SuccessModel(val)) 
        } else {
            res.json(new ErrorModel('删除失败'))
        }
    })
})
module.exports = router;