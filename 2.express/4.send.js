var express = require('express');
var http = require('http');
var app = express();
/*
app.get('/clock',function(req,res){
    //First argument must be a string or Buffer
    //end方法的第一个参数必须是字符串或者Buffer
    // 对象 数组 数字
    res.end(new Date);
});
*/
app.use(function(req,res,next){
    //增加一些公共的方法
    res.send= function(data){
        console.log(typeof data == 'string');
       if(typeof data == 'string' || Buffer.isBuffer(data)){
           res.setHeader('Content-Type','text/html;charset=utf-8');
           res.end(data);
       }else if(typeof data == 'object'){
           res.setHeader('Content-Type','application/json;charset=utf-8');
           res.end(JSON.stringify(data));
       }else if(typeof data == 'number'){
           res.statusCode = data;
           res.end(''+data);
       }
    }
    //res.setHeader('Content-Type','text/html;charset=utf-8');
    next();
});

app.get('/users/1',function(req,res){
   res.send({id:1,name:'珠峰培训1'});
})
app.get('/users',function(req,res){
    res.send([{id:1,name:'珠峰培训2'}]);
})
app.get('/none',function(req,res){
    res.send(404);
})


app.listen(9090);