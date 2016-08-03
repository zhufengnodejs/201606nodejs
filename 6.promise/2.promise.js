var Promise = require('./bluebird');
// node 6+ window chrome
//console.log(Promise);
//resolve 解决，成功，它也是一个函数，调用它可以让promise从初始态变为成功态
// reject 拒绝 失败 它也是一个函数，调用它可以让promise 从初始态变为失败态
var promise = new Promise(function (resolve, reject) {
    setTimeout(()=> {
        var num = Math.random();
        if (num > 0.5) {
            resolve(num);//成功之后会把结果传给函数
        } else {
            reject('太小了');//失败之后会把原因传给函数
        }
    },1000)
})
//成功的回调 和失败的回调
promise.then(function (data) {
    console.log(data);
}, function (reason) {
    console.log(reason);
});
