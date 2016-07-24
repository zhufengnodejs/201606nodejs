var express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var app = express();
//app.use(cookieParser());
app.use(function(req,res,next){
    var cookie = req.headers.cookie;// name=zfpx; age=8
    req.cookies = querystring.parse(cookie,'; ');
    next();
});
/*app.use(function(req,res,next){
    res.cookie = function(name,value){
        res.setHeader('Set-Cookie',`${name}=${value}`);
    }
    next();
});*/
app.get('/write',function(req,res){
    //cookie 是express提供的方法
    // domain指明了此cookie属于哪个域名
    //res.cookie('name','zfpx',{domain:'.zfpx.cn'});
     //指定此cookie属于哪个路径
    //res.cookie('name','zfpx',{path:'/read2'});
    //指定绝对过期时间
    //res.cookie('name','zfpx',{expires:new Date(Date.now()+10*1000);
    //指定相对失效时间
    //res.cookie('name','zfpx',{maxAge:10*1000});
    //写入cookie
    res.cookie('name','zfpx',{httpOnly:true});
    res.send('ok');
});
app.get('/read',function(req,res){
    console.log(req.cookies);
    res.send(req.cookies);
});
app.get('/read2',function(req,res){
    console.log(req.cookies);
    res.send(req.cookies);
});


app.listen(9090);