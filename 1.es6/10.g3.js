var fs = require('fs');
function read(filename){
    return function(callback){
        fs.readFile(filename,'utf8',function(err,data){
            callback(data);
        })
    }
}
co(function*(){
    var a = yield read('1.txt');
    console.log(a);
    var b = yield read('2.txt');
    console.log(b);
})();
//co 可以让迭代器自动执行
function co(gen){
    return function(){
        var it = gen();//得到迭代器
        function next(val){
            var result = it.next(val);
            if(!result.done){
                result.value(next);
            }
        }
        next();
    }
}

