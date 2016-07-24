var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.get('/login',function(req,res){
 res.sendFile('./remember.html',{root:__dirname});
});

app.post('/login',function(req,res){
  var user = req.body;
    console.log(user);
  if(user.username == 'admin' && user.password=='admin'){
        res.cookie('username',user.username);
        res.cookie('password',user.password);
        res.redirect('/user');
  }else{
      res.redirect('back')
  }
});
app.get('/user',function(req,res){
    res.send(req.cookies.username);
});




app.listen(9090);