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

var num = 100;
var promise1 = readFile('1.txt');
var promise2 = readFile('2.txt');
Promise.all([promise1,promise2,Promise.resolve(100)]).then(function(data){
   var result = data.map(num=>parseInt(num)).reduce((curr,next)=>curr+next,0);
    console.log(result);
},function(reason){
    console.error(reason);
});