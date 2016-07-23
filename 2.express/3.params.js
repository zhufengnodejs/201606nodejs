var c = console.log;
/**
 * 在服务器端接收客户端的参数
 */
var express = require('express');
var app = express();

app.get('/',function(req,res){
    c(req.url);
    //获取主机名
    c(req.hostname);
    //获取路径名
    c(req.path);
    c(req.query);
    res.end(req.hostname+req.path);
});
//路径参数 /books/200
// //books/\w+/
app.get(/books\/\w+/,function(req,res){
    res.end('bookId:');
});
// /users/200/zfpx
// params默认是一个空对象，它的属性来自于路径配置
app.get('/users/:id/:name',function(req,res){
  c(req.params.id,req.params.name);
  res.end('id:'+req.params.id);
});

app.listen(9090);
/**
 * 1. 如果路径中有占位符的话，需要把它转成正则表达式,另外要记录原始的占位符
 * 2. 当有请求到来的时候，用正则进行匹配，如果能匹配上，则给req增加params属性
 * 3. 然后把对应的值赋给对应的属性
 *
 **/