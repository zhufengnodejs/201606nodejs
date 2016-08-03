//手机号->QQ号->微信号->基本信息
var express = require('express');
var app = express();
app.use(express.static(__dirname));
//通过手机号查QQ
// /getQQByPhone?phone=18910092296 => 83687401
var QQ = {'18910092296':'83687401'};
app.get('/getQQByPhone',function(req,res){
   res.send(QQ[req.query.phone]);
});

// /getWeixinByQQ?qq=83687401 => zhangrenyang2000
var WEIXIN = {'83687401':'zhangrenyang2000'};
app.get('/getWeixinByQQ',function(req,res){
    res.send(WEIXIN[req.query.qq]);
});

// /getNameByWeixin?weixin=zhangrenyang2000 => 张仁阳
var BASIC = {'zhangrenyang2000':'张仁阳'};
app.get('/getNameByWeixin',function(req,res){
    res.send(BASIC[req.query.weixin]);
});


app.listen(9090);