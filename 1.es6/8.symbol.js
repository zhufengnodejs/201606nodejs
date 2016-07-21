/*
var l = console.log;
let s1 = Symbol();
let s2 = Symbol();
l(s1 === s2);

var luckNumber = Symbol();
var person = {};
person[luckNumber] =  9;
l(person[luckNumber]);*/
var Operator = {
    add:Symbol(),
    minus:Symbol()
}
function cal(op,a,b){
    switch(op){
        case Operator.add:
            return a+b;
        case Operator.minus:
            return a-b;
    }
}
console.log(cal(Operator.add,5,5));
console.log(cal(Operator.minus,10,5));