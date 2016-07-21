//2.var的问题
var a = 10;
if(true){
    var a = 20;
}
console.log(a);
//在循环的时候标记变量引用同一个
var i = 0;
for(i=0;i<5;i++){
    setTimeout(function(){
        console.log(i);
    },1000)
}