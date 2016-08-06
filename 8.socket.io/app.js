var express = require('express');
var app = express();
/*app.get('/socket.io/socket.io.js',function(req,res){
    res.send('node_modules/socket.io-client/socket.io.js',{root:__dirname});
});*/
//当客户端访问/的执行时候，执行回调函数
app.get('/',function(req,res){
    res.sendFile('index.html',{root:__dirname});
});
//创建一个http服务器
var server = require('http').createServer(app);
//基于http服务器可以创建一个io服务器(websocket)服务器了
var io = require('socket.io')(server);
//监听客户端连接事件
io.on('connection',function(socket){
   console.log('客户端已经连接');
   socket.on('message',function(message){
       //通知所有的人
      io.emit('message',message);
   });
   socket.on('error',function(){
       console.log('客户端错误');
   })
});
server.listen(9090);
