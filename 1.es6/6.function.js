var l = console.log;
/*
/!*
let print = function(a,b,c){
    l(a,b,c);
}

//print(1,2,3);
print(...[1,2,3,4]);

l(Math.max(1,5,3,6));

l(Math.max.apply(null,[1,2,3,4]))
l(Math.max(...[1,2,3,4]))
//合并数组
var arr1 = [1,2];
var arr2 = [3,4];
l(arr1.concat(arr2));
l([...arr1,...arr2]);

//类数组转成数组
function sum(){
 /!*var args = Array.prototype.slice.call(arguments);*!/
 var args = [...arguments];
 //reduce 收敛 把一个数组所有的元素收敛成一个值

 return args.reduce(function(curr,next){
     l(curr,next);
     //curr是上一次函数执行返回值
     //next是下一个元素
    return curr + next;
 },0);// 0 初始值

}
l(sum(1,2,3,4,5))
*!/

/!*(function countDown(num){
 l(num--);
 if(num>0)
     countDown(num);
})(5)*!/
//console.log(countDown);
// 左边表示参数，右边表示返回值
var arr = [1,2,3].map(item=>item*2);
//如果多于一个参数，则用小括号包起来
//如果此函数不单只是返回一个值,函数体要用大括号包起来
var arr = [1,2,3].map((item,index)=>{
    l(index);
    return item*2;
});
console.log(arr);

var person = {
    name:'zfpx',
    getName:function(){
        //let self = this;
        setTimeout(function(){
            console.log(this.name);
        },1000);
        /!*setTimeout(()=>{
            console.log(this.name);
        })*!/
    }
}
person.getName();
/!**
 * 1.slice.call(arguments);
 * 2. ...arguments
 * 3. Array.from
 *!/
function sum(){
    console.log(Array.from(arguments));
}
sum(1,2,3);
*/

l(Array(2));//表示数组的长度
l(Array.of(2));//把参数当作数组的元素
/**
 *
 */
function Person(){
    console.log(this instanceof Person);
    if(!(this instanceof Person)){
        return new Person();
    }
    this.name = 'zfpx';
}
Person.prototype.getName = function(){
    return this.name;
}
var p =   Person();
l(p.getName());
// 1 从哪个索引开始覆盖
// 2 从哪个索引开始取
// 3 到哪个索引结束

l([1,2,3,4,5].copyWithin(1,3,4));

var arr = [{name:'zfpx',age:8},{name:'zfpx2',age:9}];
//console.log(arr.indexOf({name:'zfpx2',age:9}));
l(arr.find((item)=>item.age ==8));

let arr3 = [1,2,3,4,5,6];
arr3.fill(6,2,3);
l(arr3);







