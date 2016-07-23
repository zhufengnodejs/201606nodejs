/**
 * 如何使用express
 */
var express = require('./express');
var app = express();
//路由配置
// get 请求的方式  /hello是路径
app.get('/hello',function(req,res){
  res.end('hello');
});

app.get('/world',function(req,res){
    res.end('world');
});
app.listen(3000);


