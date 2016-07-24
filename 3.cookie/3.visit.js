/**
 记录此客户端访问了多少次服务器
*/

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.get('/visit',function(req,res){
    //取出请求头中的cookie字段的visit字段
    var visit = req.cookies.visit;
    if(visit){//如果有值表示以前访问过，写入过visit字段
        visit = parseInt(visit)+1;
    }else{
        visit = 1;//如果没有值初始化为1
    }
    //第一次来店里的时候写一个1给客户端保存
    res.cookie('visit',visit);
    res.send(`这是你的第${visit}次访问`);
});

app.listen(9090);