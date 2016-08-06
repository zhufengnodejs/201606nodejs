var express = require('express');
var bodyParser = require('body-parser');

var app = express();
//当请求体的格式查询字符串的时候
app.use(bodyParser.json());
//app.use(bodyParser.text());
/**
 * 老板派业务员去打听市场里苹果的价格
 * 去的时候带着当前的价格
 * 业务员到了菜市场，开始观察，如果观察到价格变动了，就回来报告，如果没变化，就等着
 */
var currentPrice = '' + (Math.random() * 10);
setInterval(function(){
    currentPrice = '' + (Math.random() * 10);
},5000);
//业务员带着当前的价格去客户端询问
app.post('/price', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    var originalPrice = req.body.price;
    setInterval(function () {
        //检查原来的价格跟当前价格的区别，如果不一样
        if(originalPrice != currentPrice){
            res.send(currentPrice);
        }
    }, 1000);
});
//当客户端通过跨域向服务器发起post请求
//客户端会先发一个options请求，用来询问服务端支持的方法名
app.options('/price',function(req,res){
    //设置允许从哪个来源的请求
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    //允许 客户端向服务器发送哪种方法的请求
    res.setHeader('Access-Control-Allow-Methods','POST');
    //允许 客户端向服务器发送哪个请求头
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.send('');
});
app.listen(9090);