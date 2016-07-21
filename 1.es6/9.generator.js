var l = console.log;
//自己实现一个生成器和迭代器
function buy(books){
   let index = 0;//当前迭代到哪个元素了
   return {
        next(){
            return {
                value:books[index++],
                done:index>books.length
            }
        }
   }
}

let it = buy(['node','javascript']);
//有一个next方法
l(it.next());//{value:'node',done:false}
l(it.next());//{value:'javascript',done:false}
l(it.next());//{value:undefined,done:true}