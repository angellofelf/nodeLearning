const fs = require('fs')
const path = require('path')

//callback 方式获取一个文件内容
// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, 'files', fileName);
//     fs.readFile(fullFileName, (err, data) => {
//         if(err) {
//             console.log(err);
//             return ;
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// //测试
// getFileContent('a.json', aData => {
//     console.log(aData);
//     getFileContent(aData.next, bData => {
//         console.log(bData);
//         getFileContent(bData.next, cData => {
//             console.log(cData)
//         })
//     });
//     digui(aData);
// })

// function digui(data) {
//    console.log(data);
//    if(data.next !== 'null') {
//     getFileContent(data.next, (data) => {
//         digui(data)
//     })  
//    }
// }

  
const getFileContent = (fileName) => {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname,'files', fileName);
        fs.readFile(fullFileName, (err, data) => {
            if(err) {
                reject(err);
                return ;
            }
            resolve(
                JSON.parse(data.toString())
            )
            
        })
    })

    return promise ;

}

getFileContent('a.json').then(data => {
    console.log(data);
    return getFileContent(data.next);
}).then(data => {
    console.log(data);
    return getFileContent(data.next);
}).then(data => {
    console.log(data)
})


