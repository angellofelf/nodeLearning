const fs = require('fs');
const path = require('path');
const readline = require('readline');

//文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');

//创建读取liu对象
const readStream = fs.createReadStream(fileName);

//readline对象
const rl = readline.createInterface({
    input: readStream,
})

//开始分析
let Chromenum = 0;
let sum = 0 ;

//逐行读取
rl.on('line', (lineData) => {
    if (!lineData) {
        return;
    }

    sum++;
    const arr = lineData.split(' -- ');
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        //累计chrome的数量
        Chromenum++;
    }

})

rl.on('close', (err) => {
    if (err) {
        console.error(err);
    }
    console.log('Chrome的占比是：', Chromenum/sum)
})