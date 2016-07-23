//在真正的业务处理之前执行的一些中间函数

var express = require('./express');

var app = express();

//是否调用next决定此请求是否向下处理
app.use('/hello',function(req,res,next){
  console.log('filterA');
    res.end('over');
  //next();//调用next表示可以向下执行
});
app.use('/hello',function(req,res,next){
    console.log('filterB');
    next();//调用next表示可以向下执行
});
app.get('/hello',function(req,res){
    res.end('hello');
});
app.listen(3000);
