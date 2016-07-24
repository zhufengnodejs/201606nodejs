/**
 记录此客户端访问了多少次服务器
*/

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('zfpx'));//加一个密钥 用来实现对cookie的加密
app.get('/visit',function(req,res){
    //取出请求头中的cookie字段的visit字段
    var visit = req.signedCookies.visit;
    if(visit){//如果有值表示以前访问过，写入过visit字段
        visit = parseInt(visit)+1;
    }else{
        visit = 1;//如果没有值初始化为1
    }
    //第一次来店里的时候写一个1给客户端保存
    res.cookie('visit',visit,{signed:true});//要对cookie进行加密
    res.send(`这是你的第${visit}次访问`);
});

app.listen(9090);