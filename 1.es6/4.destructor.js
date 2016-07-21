var l = console.log;
/*let arr = ['zfpx',8];
//使用类似数组方法定义一组变量
//会把数组中的元素依次赋给name,age
let [name,age] = arr;
l(name,age);
//嵌套赋值
let [x,,y] = [1,[2,3],4];
l(x,y);*/

//把对象中的属性的值赋给同名的变量
/*var obj = {name:'zfpx',age:8};
let {name:name1,age:age1} = obj;
l(name1,age1);*/

var arr = [,'男'];
//默认值
//
let [name='无名氏',gender=new Error('性别必须提供')] = arr;
l(name,gender);
//默认参数
function ajax(options){
   // 有些参数需要默认值 method=GET
   // 有些参数必须 提供 url
    options.method = options.method?options.method:'GET';
    if(!options.url){
        throw Error('url must be tansfered');
    }
}

function ajax({method='GET',url=new Error('url必须提供')}){
    l(method,url);
}
ajax({url:'/ajax'});