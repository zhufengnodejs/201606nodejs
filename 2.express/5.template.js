var express = require('express');
var app = express();
app.set('view engine','ejs');//设置模板引擎
app.set('views',__dirname);//模板存放目录
var fs= require('fs');
var path= require('path');
/**
 * 编写动态网页的工具
 * 1. 读取模板内容
 * 2. 替换里面的点位符
 * 3. 把HTML的结果发给客户端
 */
app.use(function(req,res,next){
  res.render = function(tmplname,data){
    //得到加上后缀的文件名
    tmplname = tmplname+(tmplname.endsWith('.ejs')?'':'.ejs');
    //读取模板文件 用模板存放目录+模板名称
    fs.readFile(path.join(app.get('views'),tmplname),'utf8',function(err,result){
      result = result.replace(/<%=(\w+)%>/g,function(matched,group1){
          return data[group1];
       });
      res.send(result);
    });
  }
  next();
})
var user = {id:1,name:'zfpx',age:3};
app.get('/',function(req,res){
  res.render('user',user);
});

app.listen(9099);