/*var app = function(req,res){
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
}*/

var app = function(req,res){
    var method = req.method.toLowerCase();//获取请求的方法
    var pathname = require('url').parse(req.url,true).pathname;
    var index =0;
    function next(){
        var route = app.router[index++];
        var routeMethod = route.method;
        if(routeMethod == 'all'){//表示中间件配置
            if(pathname == route.path || route.path == '*'){//如果请求路径和当前路由配置的路径相同
                route.fn(req,res,next);//执行此中间件函数
            }else{
                next();
            }
        }else{
            if(pathname == route.path || route.path == '*'){
                route.fn(req,res);
            }else{
                next();
            }
        }

    }
    next();
}

app.router = [];//里面存放着所有的路由配置项
function express(){
    return app;
}
//循环所有的方法，给app增加这些方法名同名的属性
['get','post','put','delete','option','patch'].forEach(function(method){
    app[method] = function(path,fn){
        //请求的方法 请求的路径 和监听回调函数
        app.router.push({method:method,path:path,fn:fn});
    }
});
//配置所有的方法,相同的路径返回相同内容
app.all = function(path,fn){
    ['get','post','put','delete','option','patch'].forEach(function(method){//增加路由配置
        app.router.push({method:method,path:path,fn:fn});
    });
}

app.use = function(path,fn){
    //如果只传了中间件函数，没有传路径
    if(typeof path =='function'){
        fn = path;
        path = '*';
    }
    app.router.push({method:'all',path:path,fn:fn});
}

app.listen = function(){
    require('http').createServer(app).listen(3000);
}

module.exports = express;