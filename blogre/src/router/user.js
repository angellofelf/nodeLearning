
const { login } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../model/resModel')
const { set } = require('../db/redis')
const getCookieExpires = () => {
   let d = Date.now();
   d = d.setTime(d.getTime()+24*60*60*1000);
   return d.toGMTString();
}

const handleUserRouter = (req, res) => {

    const method = req.method;
    
    

    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body ;
        const result = login(username, password);

        return result.then(data => {
            if (data.username) {

                // //登录成功 后台操作cookie
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()};`)
                //登陆成功后 后台把用户信息存入session
                req.session.username = data.username;
                req.session.realName = data.realName;
                set(req.sessionId, req.session)
                return new SuccessModal()
            } else {
                return new ErrorModal('登陆失败')
            }
        })
    }

    if (method === 'GET' && req.path === '/api/user/login-test') {
        //判断session里面是否有值就好了
        if (req.session.username) {
            return Promise.resolve(new SuccessModal(
                {
                    message:'登陆成功'
                }
              ));
        }
        return Promise.resolve(new ErrorModal('尚未登陆'))
    }
}

module.exports = handleUserRouter;