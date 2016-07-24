
var path = '/users/:id/hello/:name'.replace(/:\w+/g,'(\\w+)');
console.log(path);

var regex = new RegExp(path);
var url = '/users/1/hello/zfpx';
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