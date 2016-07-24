/**
 * Created by wx on 2016/7/24.
 */
function express() {
    return app;
}

//（2）app函数执行部分
var app = function (req, res) {
    //请求的方法
    var method = req.method.toLowerCase();
    var objUrl = require('url').parse(req.url, true);

    var pathName = objUrl.pathname; //请求的路径
    console.log('-----------------------------'+pathName+'-----------------------------');

    var index = 0;
    function next() {
        //遍历完app.router数组，直接返回
        if(index >= app.router.length){
            return ;
        }
        var route = app.router[index++];

        //给req.params个初始值
        req.params = {};
        var paramsL = route.params.length; //路由定义时params的个数，没有就是0


        console.log('paramsL: '+paramsL);

        //（2-1） =0 正常匹配
        if(paramsL == 0){
            if ((method == route.method) && (pathName == route.path || route.path == '*')) {

                route.fn(req, res); //执行处理函数
            } else { //不匹配，继续找下一个
                next();
            }
        }else {
            //（2-2）!=0 表示有params部分，

            //（2-2-1）先匹配基本路径，
            //通过Pos的值看基本路径是否满足
            var Pos = pathName.indexOf(route.path);

            if (Pos == 0) { //基本路径匹配，然后匹配params部分
                var objParams = {}; //params临时存储对象
                var flagNum = 0; //req中param的个数

                //（2-2-2）去除req中的基本路径，然后匹配正则
                //localhost:3000/index/1/2/3
                //localhost:3000/index
                pathName.slice(route.path.length).replace(/\/(\w+)/g, function (matched, group1) {
                    objParams[route.params[flagNum++]] = group1;
                });

                //（2-2-3）判断req中params个数和定义得是否相等
                if (flagNum == paramsL) {
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

    next();
};

//里面存放的所有路由配置项
app.router = [];
//（1）定义部分
app.get = function (path, fn) {
    var params = [];
    //判断路径中是否有params部分
    //localhost:3000/index/:id/:name
    if (/\/:(\w+)/.test(path)) {
        //path中如果有params去除，path只保留基本路径
        path = path.replace(/\/:(\w+)/g, function (matched,group1) {
            //params部分的每一项按顺序放到数组中
            params.push(group1);
            return '';
        });

    }

    //method：请求方式；path: 基本路径；fn: 处理函数；params: [数组]params的参数名
    app.router.push({method: 'get', path: path, fn: fn, params: params});
};

app.listen = function (port) {
    require('http').createServer(app).listen(port,function(){
        console.log('create server success,listening port '+ port);
    });
};

module.exports = express;