var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine','html');
//对html的模板按EJS的语法来进行渲染
app.engine('html',require('ejs').__express);
app.set('views',path.resolve('views'));
app.use(express.static(path.resolve('public')));
var querystring = require('querystring');
//处理post请求的,会把请求体中的字符串参数取出来转成对象并挂在req.body上前
// extended=true表示使用querystirng ,false用bodyParser自已写的一个转换工具
app.use(bodyParser.urlencoded({extended:true}));
/*app.use(function(req,res,next){
    // 1. 获取请求体 2. 转成对象 3. 赋给req.body
    //请求对象是一个可读流，所以可以监听它的data事件
    var str = '';
    req.on('data',function(data){
        str += data;
    })
    req.on('end',function(){
        var body = querystring.parse(str);
        req.body = body;
        next();
    });
});*/
app.get('/',function(req,res){
    //path must be absolute or specify root
    //把指定的文件发送给客户端
    res.sendFile('./home.html',{root:path.resolve('views')});
    //res.sendFile(path.resolve('views/home.html'));
});

app.get('/login',function(req,res){
    res.render('login',{title:'登陆'});
});

app.post('/login',function(req,res){
   var user = req.body;
   if(user.username == 'admin' && user.password == 'admin'){
        res.render('user',user);
   }else{
       res.redirect('back');
   }

});


app.listen(9090);