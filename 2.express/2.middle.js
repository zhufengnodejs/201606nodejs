//在真正的业务处理之前执行的一些中间函数

var express = require('./express');

var app = express();

//是否调用next决定此请求是否向下处理
app.use('/hello',function(req,res,next){
  console.log('filterA');
    //如果next有参数表示出错了，如果 出错了，会跳过所有的正常中间件和路由，交给错误处理中间件来处理
  next('filterA出错了');//调用next表示可以向下执行
});
app.use('/hello',function(req,res,next){
    console.log('filterB');
    next();//调用next表示可以向下执行
});
app.get('/hello',function(req,res){
    res.end('hello');
});
//错误处理中间件多了一个参数 err
app.use(function(err,req,res,next){
    console.log(err);
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.end(err);
});
app.listen(3000);
