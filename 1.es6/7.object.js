var l = console.log;
let name = 'zfpx';
let age = 6;
let getName = function(){
    console.log(this.name);
}

let person = {
    name,
    age,
    getName
}
person.getName();
//判断两个值是否相等
l(NaN === NaN);
l(Object.is(NaN,NaN));
l("hello"==new String("hello"));//比较是否字符串内容相同
l("hello"===new String("hello"));//比较引用地址是否是同一个
l(Object.is("hello",new String("hello")));

var nameObj = {name:'zfpx'};
var ageObj = {age:8};
var obj = {};
Object.assign(obj,nameObj,ageObj);
l(obj);

//实现了对象的克隆
let newObj = Object.assign({},obj);
l(newObj);
l(obj == newObj);

var obj1 = {name:'zfpx1'};
var obj2 = {name:'zfpx2'};
var obj = {};
//obj.__proto__ = obj1;
Object.setPrototypeOf(obj,obj1);
l(obj.__proto__ === obj1);
l(obj.name);
l(Object.getPrototypeOf(obj)===obj1);
Object.setPrototypeOf(obj,obj2);
l(obj.name);


var obj1 = {
    eat(){
        return '米饭';
    }
};
var obj3 = {
    __proto__:obj1,
    eat(){
        ///通过super调用__proto__上的方法
        return "鸡蛋"+super.eat();
    }
}
l(obj3.eat());




