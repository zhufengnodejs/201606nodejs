var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
// name=zfpx&age=8 => req.body
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'zfpx',
    resave:true,
    saveUninitialized:true
}));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
var users = [];
app.get('/login',function(req,res){
    res.render('login',{title:'登录'});
});

app.post('/login',function(req,res){
    var user = req.body;
    var existUser = users.find((item)=>{
        return item.username == user.username && item.password == user.password;
    })
    if(existUser){
        //登陆成功之后把当前用户放在session中
        req.session.user = existUser;
        res.redirect('/user');
    }else{
        res.redirect('back');
    }
});

app.get('/reg',function(req,res){
    res.render('reg',{title:'注册'});
});
app.post('/reg',function(req,res){
    var user = req.body;
    var existUser = users.find((item)=>{
        return item.username == user.username;
    })
    if(existUser){
        res.redirect('back');
    }else{
        users.push(user);
        res.redirect('/login');
    }
});

app.get('/user',function(req,res){
    var user = req.session.user;
   res.render('user',{title:'用户页面',username:user.username});
});

app.listen(9090);