/**
 * Created by wx on 2016/7/23.
 */
var express = require('./express/index.js');
//var express = require('express');
var app = express();
//路径参数 /users/2
//params：默认是空对象，它的属性来自于路径配置
app.get('/users/:id/:name',function(req,res){
    console.log(req.params);
    res.end(JSON.stringify(req.params));
});

app.get('/users/:id/:name/:age',function(req,res){
    console.log(req.params);
    res.end(JSON.stringify(req.params));
});

app.get('*',function(req,res){
    console.log(req.host);
    console.log(req.path);
    console.log(req.query);
    res.end(req.host+req.path);
});



app.listen(3000);