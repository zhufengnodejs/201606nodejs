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
var promise1 = readFile('1.txt');
var promise2 = readFile('2.txt');
// async.parallel

//全部成功之后才成功
/*Promise.all([promise1,promise2]).then(function(data){
    console.log(data);
})*/
/*
//只有一个成功就可以
Promise.race([promise1,promise2]).then(function(data){
    console.log(data);
})*/
