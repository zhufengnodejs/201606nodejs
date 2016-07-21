//生成器
function* gen(){
    console.log('a');
    var one = yield 'a';
    console.log(one);
    var two = yield one+'b';
    console.log(two);
}
//迭代器
var it = gen();
var r1 = it.next();//第一次调用next,会从顶部执行到第一个yield
console.log(r1);
var r2 = it.next('one');
console.log(r2);

