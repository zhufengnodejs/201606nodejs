var express = require('express');
var app = express();
var session = require('express-session');
//当使用了session中间件之后，会在req.session的属性
var count=1;
app.use(session({
 name:'sessionId',//指定向客户端保存时的名称
 cookie:{
  maxAge:10*1000//指定cookie的过期时间
 },
 genid:function(){//指定生成卡号的方式
  return ''+(count++);
 },
 resave:true,//每次都重新保存session
 saveUninitialized:true,//保存未初始化过的session
 secret:'zfpx'//密钥 加密connect.sid
}));

app.get('/visit',function(req,res){
    //req.session  是此用户在服务器上对应的数据对象
   var visit = req.session.visit;
   if(visit){
     visit++;
   }else{
     visit = 1;
   }
   req.session.visit = visit;
   res.send(`你是第${visit}次访问服务器`);
});
app.listen(9090);