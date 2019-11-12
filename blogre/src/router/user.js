
const { login } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../model/resModel')
const handleUserRouter = (req, res) => {

    const method = req.method;


    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body ;
        const result = login(username, password);

        return result.then(data => {
            if (data.username) {
                return new SuccessModal()
            } else {
                return new ErrorModal('登陆失败')
            }
        })
    }
}

module.exports = handleUserRouter;