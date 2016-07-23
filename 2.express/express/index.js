var app = function(req,res){
  var method = req.method.toLowerCase();//获取请求的方法
  var pathname = require('url').parse(req.url,true).pathname;//获取请求的路径
  for(var i=0;i<app.router.length;i++){
      var route = app.router[i];
      //方法名相同，路径相同或者路由配置配置为*
      if(method == route.method && (pathname == route.path || route.path=='*')){
          return route.fn(req,res);
      }
  }
  res.end(`Cannot ${method} ${pathname}`);
}
app.router = [];//里面存放着所有的路由配置项
function express(){

    return app;
}
//循环所有的方法，给app增加这些方法名同名的属性
['get','post','put','delete','option','patch'].forEach(function(method){
    app[method] = function(path,fn){
        app.router.push({method:method,path:path,fn:fn});
    }
});
//配置所有的方法
app.all = function(path,fn){
    ['get','post','put','delete','option','patch'].forEach(function(method){//增加路由配置
        app.router.push({method:method,path:path,fn:fn});
    });
}

app.listen = function(){
    require('http').createServer(app).listen(3000);
}

module.exports = express;