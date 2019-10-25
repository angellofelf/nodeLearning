const loginCheck = (userName, password) => {

    if (userName === 'zhangsan' && password === '123') {
       return true;
    }else {
        return false;
    }
}


module.exports = {
    loginCheck,
}