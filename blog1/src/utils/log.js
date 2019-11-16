const fs = require('fs');
const path = require('path');

//xie日志
function writeLog(writeStream, log, env) {
    writeStream.write(log+env+'\n')
}
function createWriteStream(fileName) {
    const fullName = path.join(__dirname, '../','../', 'logs',fileName);
    const writeStream = fs.createWriteStream(fullName, {
        flags: 'a'   //append追加
    });

    return writeStream;
}

//写访问日志
const accessWriteStream = createWriteStream('access.log');

function access(logs) {
    if (process.env.NODE_ENV === 'dev') {
      
        console.log(logs)
    } else if (process.env.NODE_ENV === 'production') {
    }
    const env = process.env.NODE_ENV;
    writeLog(accessWriteStream, logs, env);

  
}

module.exports = {
    access,

}