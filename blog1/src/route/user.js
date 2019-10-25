const { SuccessModel, ErrorModel } = require('../model/resMoel')
const { loginCheck } = require('../controller/user')



const handleUserRouter = (req, res) => {
   const  method = req.method;
   

   //登录
   if (method === 'POST' && req.path === '/api/user/login') {
       const { userName, password } = req.body;
       const result = loginCheck(userName, password);
       if (result) {
           return new SuccessModel(result);
       }else {
           return new ErrorModel('登陆失败')
       }

   }

}

module.exports = handleUserRouter;