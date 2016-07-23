

var path = '/users/:id/:name';
path = path.replace('/','\/');

var groups = path.match(/:(\w+)/);

console.log(groups);
path = path.replace(/:\w+/g,'(\\w+)');
console.log(path);

var regex = new RegExp(path);
console.log(regex);
var url = '/users/1/zfpx';
var res = url.match(regex);
console.log(res);


/*
var str = "school school";
var patt = new RegExp("school",'g');
var result;

while ((result = patt.exec(str)) != null)  {
    console.log(result);
    console.log(patt.lastIndex);
}*/

console.log("aaa".replace('a','\\w'));