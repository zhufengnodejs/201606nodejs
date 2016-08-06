//导入ws服务器
var Server = require('ws').Server;
//创建一个服务器实例
var server =  new Server({port:9090});
//在服务器上监听客户端的请求
// EventEmitter on() emit
//socket 代表某个客户端对象
server.on('connection',function(socket){
  //服务器监听客户端的消息
  socket.on('message',function(message){
      console.log('接收到客户端:',message);
      //向客户端发消息
      socket.send('确认:'+message);
  });
});

