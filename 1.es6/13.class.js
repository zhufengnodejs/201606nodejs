function Person(name){
    this.name = name;
}
Person.add = function(a,b){
    return a+b;
}
Person.prototype.getName = function(){
    console.log(this.name);
}

function Teacher(name){
    Person.call(this,name);
    this.age = 8;
}
Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.getAge=function(){
    console.log(this.age);
}
let person1 = new Teacher('zfpx');
console.log(person1.name,person1.age);
person1.getName();
person1.getAge();