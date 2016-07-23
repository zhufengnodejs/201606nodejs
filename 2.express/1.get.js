/**
 * 如何使用express
 */
var express = require('./express');
var app = express();

//路由配置
// get 请求的方式  /hello是路径
//表示不考虑方法名，只考虑路径
app.all('/hello',function(req,res){
  res.end('hello');
});

app.get('/world',function(req,res){
    res.end('world');
});

//能匹配所有的路径
app.get('*',function(req,res){
    res.end('Not Found');
});
app.listen(3000);


