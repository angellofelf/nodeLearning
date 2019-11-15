const fs = require('fs');
const path = require('path');


const fileName = (__dirname, 'text.txt');

fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err);
        return ;
    }
    console.log(data.toString())
})

const content = '这是追加的内容';
const opt = {
    flag: 'a' //a是append追加， w是write 是重写
}
fs.writeFile(fileName, content, opt, (err) => {
    if (err) {
        console.error(err)
    }
});

//判断文件shifoucunz
fs.exists(fileName+'1', (exist) => {
    console.log('exist', exist)
})