var Socket = require('ws');
//向服务器端发起连接请求
var socket = new Socket('ws://localhost:9090');
//监听连接事件，连接成功后调用open回调函数
socket.on('open',function(){
  console.log('连接已经建立!');
  //向服务器发送一个消息
  socket.send('服务器你好');
});
//监听服务器发过来的消息
socket.on('message',function(message){
  console.log(message);
});