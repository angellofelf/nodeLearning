const express = require('express');
const router = express.Router();
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel} = require('../model/resModel')
router.post('/login', function(req, res, next) {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then( loginData => {
        if (loginData.username) {
            req.session.username = loginData.username;
            req.session.password = loginData.password;
            req.session.realname = loginData.realname;
            res.json(
                new SuccessModel()
            )
            return ;
        }

        res.json(
            new ErrorModel('登陆失败')
        )
    })
})

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            errno: 0,
            msg: '测试chenggong'
        })
        return ;
    }
    res.json({
        errno: -1,
        msg: '未登录'
    })
})
// router.get('/session-test', (req, res, next) => {
//       const session = req.session;
//       if (session.viewNum == null) {
//           session.viewNum = 0;
//       }
//       session.viewNum++;
//       res.json(session.viewNum)
// })
module.exports = router;