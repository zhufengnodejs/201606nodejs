//常量用const定义，一旦定义不能再重新赋值了
//const MY_NAME = 'zfpx';
//Assignment to constant variable.
//试图赋值给一个常量
//MY_NAME = 'zfpx2';
//可以用来定义一些恒定不变的量
//const PI = 3.1415926;
var l = console.log;
const PERSON_INFO = {
    name:'zfpx',
    age:8
}
PERSON_INFO.name = 'zfpx2';
PERSON_INFO.age = 9;
console.log(PERSON_INFO);

const A = 'c';
l(A);
{
    const A = 'a';
    l(A);
}
{
    const A = 'b';
    l(A);
}
