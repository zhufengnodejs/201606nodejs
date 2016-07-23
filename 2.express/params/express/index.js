/**
 * Created by wx on 2016/7/23.
 */

function express() {
    return app;
}

var app = function (req, res) {
    var method = req.method.toLowerCase(); //请求的方法
    var objUrl = require('url').parse(req.url, true);
    var pathName = objUrl.pathname; //请求的路径
    console.log('-----------------------------');
    console.log(pathName);

    //如何获得主机名
    req.host = req.headers['host'].split(':')[0];
    req.path = pathName;
    req.query = objUrl.query;
    var index = 0;
    function next(err) {
        //遍历完app.router数组，直接返回
        if(index >= app.router.length){
            return ;
        }
        var route = app.router[index++];
        console.log(index);
        var routeMethod = route.method;
        req.params = {};
        var paramsL = route.params.length; //路由定义时params的个数


        var Pos = -1; //记录匹配基本目录的索引
        var objParams = {}; //params临时存储对象
        var flagNum = 0; //req中param的个数

        //err有值，表示中间件出错，找出错误中间件处理函数并执行
        if (err) {
            //route.fn.length 表示函数route.fn形参的个数
            if (routeMethod == 'use' && route.fn.length == 4) {
                route.fn(err, req, res, next);
            }
            else {
                next(err);
            }
        } else { //err没值，表示正常执行

            if (routeMethod == 'use') { //中间件
                if(paramsL == 0){ //没有params部分
                    if (pathName == route.path || route.path == '*') {
                        route.fn(req, res, next);
                    } else {
                        next();
                    }
                }else{
                    //记录匹配基本目录的索引
                    Pos = pathName.indexOf(route.path);
                    if(Pos == 0){ //基本路径匹配，然后匹配params个数
                        objParams = {};
                        flagNum = 0;
                        pathName.slice(Pos+route.path.length).replace(/\/(\w+)/g,function(matched,group1){
                            objParams[route.params[flagNum++]] = group1;
                        });

                        if(flagNum == paramsL){ //表示req的传params长度和定义长度一样
                            req.params = objParams;
                            route.fn(req, res, next);
                        }else{
                            next();
                        }

                    }else{ //基本路径不匹配
                        next();
                    }
                }


            } else { //路由
                console.log('paramsL: '+paramsL);

                if(paramsL == 0){
                    if ((method == route.method || route.method == 'all') && (pathName == route.path || route.path == '*')) {
                        req.params = route.params;
                        route.fn(req, res);
                    } else {
                        next();
                    }
                }else {
                    Pos = pathName.indexOf(route.path);
                    console.log("Pos: "+Pos);
                    if (Pos == 0) { //基本路径匹配，然后匹配params部分
                        objParams = {};
                        flagNum = 0;
                        pathName.slice(route.path.length).replace(/\/(\w+)/g, function (matched, group1) {
                            objParams[route.params[flagNum++]] = group1;
                        });

                        if (flagNum == paramsL) { //表示req的传params长度和定义长度一样
                            req.params = objParams;
                            route.fn(req, res);
                        } else {
                            next();
                        }


                    } else { //基本路径不匹配
                        next();
                    }
                }
            }

        }
    }

    next();
};

//里面存放的所有路由配置项
app.router = [];

//循环所有的方法，给app增加这些方法名同名的属性
['get', 'post', 'put', 'delete', 'option', 'patch', 'all'].forEach(function (method) {
    app[method] = function (path, fn) {
        var params = [];

        var str  = '';
        if(/\/:(\w+)/.test(path)){
            console.log('hhaha');
            path = path.replace(/\/:(\w+)/g,function(){
                params.push(arguments[1]);
                str += '/(\\w+)';
                return '';
            })
        }

        console.log('绑定--'+path, params);

        app.router.push({method: method, path: path, fn: fn, params:params});



        //console.log(path);
        //console.log(str);


        //var str2 = 'aaa';
        //var a = new RegExp(strPath);
        //app.router.push({method: method, path: path, fn: fn});

        //var regPath = strToReg(path,str);
        //app.router.push({method: method, path: regPath, fn: fn, params:params});

    };
});

function strToReg(){
    var args = Array.from(arguments);
    var str = '';
    args.forEach(function(item){

        str += item.replace(/\//g,function(){
            return '\\\/';
        });

        //str += item;
    });

    //return str;
    //return '^'+ str +'$';
    return new RegExp('^'+ str +'$');
}



app.use = function (path, fn) {
    //如果只传了处理函数，没传路径
    if (typeof path == 'function') {
        fn = path;
        path = '*';
    }
    app.router.push({method: 'use', path: path, fn: fn});
};


app.listen = function (port) {
    require('http').createServer(app).listen(port);
};

module.exports = express;