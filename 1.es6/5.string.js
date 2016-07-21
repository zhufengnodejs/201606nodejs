var l = console.log;
var name = 'zfpx';
var age = 8;
//标签函数表示可以自定义显示的规则
//strs表示字符串字面量
//相同于先把表达式进行替换，按照表达式的值进行split
function show(strs,...values){
   var s = '';
   for(let i=0;i<values.length;i++){
       s  += strs[i].toUpperCase();
       s  += (''+values[i]).toUpperCase();
   }
    s += strs[values.length];
   return s;
}
show([ '', '今年', '岁了!' ],'zfpx',8);
//show表示一个标签
let desc = show`${name}今年${++age}岁了!`;
l(desc);
/*

var str = "<ul>" +
    "<li>"+name+"</li>"+
        "<li>"+age+"</li>"+
        "</ul>";

let str2 = `<ul>
                <li>${name}</li>
                <li>${age}</li>
            </ul>`;

console.log(str);
console.log(str2);*/


var strs = 'zfpx';
l(strs.startsWith('z'));// strs.indexOf('z')==0
l(strs.endsWith('x'))// strs.indexOf('z')==strs.length-1
l(strs.includes('x'));//  strs.indexOf('z')!=-1

l(strs.startsWith('p',2));// strs.indexOf('z')==0
l(strs.endsWith('f',2))// strs.indexOf('z')==strs.length-1
l(strs.includes('x',2));//  strs.indexOf('z')!=-1

l('x'.repeat(3));
l('x'.repeat(0));