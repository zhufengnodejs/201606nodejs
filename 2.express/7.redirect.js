var express = require('express');
var app = express();
app.use(function(req,res,next){
    res.redirect = function(url){
        //如何控制客户端向新的服务url发请求
        res.statusCode = 302;//控制客户端重定向
        res.setHeader('Location',url);//设置重定向的URL地址
        res.end('');
    }
    next();
});
//当用户访问/home的时候返回home
app.get('/home/:id',function(req,res){
    console.log('home');
    var id = req.params.id;
    if(id>=100){
        res.redirect('/user');
    }else{
        res.send('home');
    }

});
app.get('/user',function(req,res){
    console.log('user');
    res.send('user');
});


app.listen(9090);