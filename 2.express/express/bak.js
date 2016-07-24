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
var url = require('url');
//是一个监听函数 请求和响应
var app = function(req,res){
    var method = req.method.toLowerCase();//获取请求的方法
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;//请求的路径
    //获取主机名
    req.hostname = req.headers['host'].split(':')[0];
    //得到路径名
    req.path = pathname;
    //取得查询字符串对象
    req.query = urlObj.query;
    var index =0;//定义当前迭代的路由索引
    function next(err){
        if(index>=app.router.length){
            return res.end('Not Found');
        }
        var route = app.router[index++];//取出当前的路由配置项
        var routeMethod = route.method;//取出路由配置项方法名
        if(err){
            //交由错误处理中间件来处理
            if(routeMethod == 'all' && route.fn.length == 4){
                route.fn(err,req,res,next);
            }else{//如果不是中间件或者 不是错误 处理中间件
                next(err);//跳过正常的中间件和路由
            }
        }else{
            if(routeMethod == 'all'){//表示中间件配置
                if(pathname == route.path || route.path == '*'){//如果请求路径和当前路由配置的路径相同
                    route.fn(req,res,next);//执行此中间件函数
                }else{
                    next();
                }
            }else{
                //普通路由
                var paraNames = route.paraNames;
                if(paraNames.length>0){
                    // /users/(\w+)/(\w+)
                    var matched = pathname.match(route.path);
                    if(matched){
                        var params = {};
                        var paraNames = route.paraNames;
                        for(var i=0;i<paraNames.length;i++){
                            params[paraNames[i]] = matched[i+1];
                        }
                        req.params = params;
                        route.fn(req,res);
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
        }
    }
    next();
}

app.router = [];//里面存放着所有的路由配置项 {method,path,fn}
function express(){
    return app;
};

//循环所有的方法，给app增加这些方法名同名的属性
['get','post','put','delete','option','patch'].forEach(function(method){
    app[method] = function(path,fn){
        var config = {method:method,path:path,fn:fn};
        if(path.includes(':')){
            var paraNames = [];
            ///users/:id/hello/:name => /users/(\w+)/(\w+)
            path = path.replace(/:(\w+)/g,function(matched,group){
                paraNames.push(group);
                return '(\\w+)';
            });
            config.paraNames = paraNames;
            config.path = new RegExp(path);
        }
        //请求的方法 请求的路径 和监听回调函数
        app.router.push(config);
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

app.listen = function(port){
    require('http').createServer(app).listen(port);
}

module.exports = express;