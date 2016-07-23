var app = function(req,res){
  var method = req.method.toLowerCase();//获取请求的方法
  var pathname = require('url').parse(req.url,true).pathname;//获取请求的路径
  for(var i=0;i<app.router.length;i++){
      var route = app.router[i];
      if(method == route.method && pathname == route.path){
          return route.fn(req,res);
      }
  }
  res.end(`Cannot ${method} ${pathname}`)
}
function express(){
    app.router = [];//里面存放着所有的路由配置项
    return app;
}
//这才是真正请求监听函数 配置路由
app.get = function(path,fn){
    app.router.push({method:'get',path:path,fn:fn});
}

app.listen = function(){
    require('http').createServer(app).listen(3000);
}

module.exports = express;