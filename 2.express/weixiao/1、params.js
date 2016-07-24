/**
 * Created by wx on 2016/7/24.
 */

var express = require('express');
///var express = require('./express');
var app = express();

app.get('/index/:id/:name/333afdf/:age',function(req,res){
    console.log(req.params);
    res.end(JSON.stringify(req.params));
});

app.get('/index/:id/:name/:age',function(req,res){
    console.log(req.params);
    res.end(JSON.stringify(req.params));
});

app.get('*',function(req,res){
    console.log('404');
    res.end('no found');
});

app.listen(3000);