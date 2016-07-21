//let 实现块作作用域
//如果没有用var的话是声明到全局下了
/*
a = 10;
if(true){
    //使用let可以声明一个只在当前块中使用的变量
    let a = 20;
}
console.log(global.a);

*/

/*let i=100;
for(let i=0;i<2;i++){
    let i = 100;
    console.log('outer',i);
   for(let i=0;i<2;i++){
       console.log('inner',i);
   }
}*/
//Identifier 'a' has already been declared
/*if(true){
    let a = 2;
    let a = 3;
}*/
//a is not defined 变量未定义
/*
console.log(a);
let a = 20;*/
//let a = 20;
/*(function(){
    var a=10;
    console.log(a);
})()*/
/*{
    let a=10;
    console.log(a);
}
console.log(a);*/
let i=100;
for(let i=0;i<2;i++){
    let i = 10;
    console.log(i);
}