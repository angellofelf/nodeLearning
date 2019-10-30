const { SuccessModel, ErrorModel } = require('../model/resMoel')
const { login } = require('../controller/user')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
   const  method = req.method;
   

//    //登录
//    if (method === 'POST' && req.path === '/api/user/login') {
//        const { username, password } = req.body;
//        const result = login(username, password);
//        return result.then(data => {
//            if (data.username) {
//                return new SuccessModel('登录成功');
//            }
//            return new ErrorModel('登录失败')
//        })

//    }

   //登录ceshi2
   if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then(data => {
        if (data.username) {
            // 设置session
            req.session.username = data.username;
            req.session.realname = data.realname;
            
            //同步到session
            set(req.sessionId, req.session)
            return new SuccessModel(data.username);
        }
        return new ErrorModel('登录失败')
    })

}
   //登录测试
   if (method === 'GET' && req.path === '/api/user/login-test') {
       if (req.session.username) {
           return Promise.resolve(new SuccessModel(req.session));
       }
       return Promise.resolve(new ErrorModel('尚未登录'))
   }

}

//登录验证测试

module.exports = handleUserRouter;