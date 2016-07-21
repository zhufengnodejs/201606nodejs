var l = console.log;
//自己实现一个生成器
/*function buy(books){
   let index = 0;//当前迭代到哪个元素了
   return {
        next(){
            return {
                value:books[index++],
                done:index>books.length
            }
        }
   }
}*/
//function* 生成器函数
function* buy(books){
  l('start1');
  var one = yield 'node';//产生node
  l(one,'start2');
  var two = yield 'javascript';
  l(one,two,'start3');
}
//迭代器
let it = buy(['node','javascript']);
let result1 = it.next('ccc');
l(result1);
let result2 = it.next('aa');
l(result2)
let result3 = it.next('bbb');
l(result3)
//有一个next方法
//l(it.next());//{value:'node',done:false}
//l(it.next());//{value:'javascript',done:false}
//l(it.next());//{value:undefined,done:true}
//让迭代器自动迭代完成
/*
var curr;
do{
    curr = it.next();
    l(curr);
}while(!curr.done);*/
