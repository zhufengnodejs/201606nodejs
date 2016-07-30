function s(){
    setTimeout((data)=>{
        console.log(this);
    })
}
var obj  ={
    s
}
obj.s();