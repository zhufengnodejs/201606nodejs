class Person{
    //构造函数
    constructor(name){
        this.name = new String(name);
        this.hobbies = {};
    }
    get hobby(){
        return Object.keys(this.hobbies).join(';');
    }
    set hobby(hobby){
        this.hobbies[hobby]= hobby;
    }
    //可以通过类来调用
    static add(a,b){
        return a+b;
    }
    getName(){
        console.log(this.name);
    }
}
/*

//Person.__proto__=> Function.Prototype
function Person(name){
    this.name = name;
}
Person.add = function(a,b){
    return a+b;
}
Person.prototype.getName = function(){
    console.log(this.name);
}
let person1 = new Person('zfpx');
console.log(person1.add(1,2));




let person2 = new Person('zfpx');
console.log(person1.add(1,4));
console.log(person1.name === person2.name);//false
console.log(person1.getName === person2.getName);//true

person1.hobby = 'smoking';
person1.hobby = 'drinking';

/!*person1.hobbies.push('smoking');
person1.hobbies.push('drinking');*!/
console.log(person1.hobby);
*/

class Teacher extends Person{
    constructor(name){
        super(name);
        this.age = 9;
    }
}
var teacher = new Teacher('zzzz');
console.log(teacher.name,teacher.age);