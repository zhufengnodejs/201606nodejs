var fs = require('fs');
//学习链式调用和错误处理
var readFile = function (filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
readFile('1.txt')
    .then(function (data) {
        return readFile(data);
    })
    .then(function (data) {
        return readFile(data);
    })
    .then(function (data) {
      console.log(data);
    })
    //捕获链式调用中的任何一个错误
    .catch(function(err){
        console.error(err);
    })