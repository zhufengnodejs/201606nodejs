var express  = require('express');
var path  = require('path');
var mime  = require('mime');
var app = express();
//使用静态文件中间件 指定静态文件的存放目录
//  /index.html
app.use(static(path.join(__dirname,'public')));
app.use(static(path.join(__dirname,'app')));
var path = require('path');
var fs = require('fs');
function static(root){
  return function(req,res,next){
      //1. 先去判断一下对应的路径里有没有此文件，有读返回，没有跳过
      // /index.html
      var filename = path.join(root,req.path);
      fs.exists(filename,function(exists){
         res.setHeader('Content-Type',mime.lookup(filename));
        if(exists){
            fs.createReadStream(filename).pipe(res);
        }else{
            next();
        }
      })
  }
}
//app.use(express.static(path.join(__dirname,'public')));
app.get('/hello',function(req,res){
    res.send('hello');
});
app.listen(9090);