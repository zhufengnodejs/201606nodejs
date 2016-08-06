var express = require('express');
var app = express();
app.get('/price',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:63342');
    setTimeout(function(){
        res.send(''+(Math.random()*10));
    },5000);

});
app.listen(9090);