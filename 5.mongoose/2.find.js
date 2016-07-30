var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/201606blog');
//定义一个模型骨架，它不能直接操作数据库
var PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:0,
        max:600
    },
    gender:{
        type:String,
        enum:['男','女']
    },
    home:String,
    birthday:{type:Date,required:true,default:Date.now}
    //如果你想固定下来集合的名称，需要加这样一个参数
});

var PersonModel = mongoose.model('Person',PersonSchema);

var persons = [];
for(var i=1;i<=10;i++){
    persons.push({name:'zfpx'+i,age:i});
}
var cb = function(err,result){
    if(err){
        console.error(err);
    }else{
        console.log(result);
    }
};
//向集合中保存文档对象
//PersonModel.create(persons,cb);
//查询集合中的所有文档
//PersonModel.find({},cb);
//PersonModel.find({age:6},cb);
//把姓名以zfpx开头的文档的age字段自加3，如果匹配到多条，则全部更新
//PersonModel.update({name:new RegExp(/^zfpx/)},{$inc:{age:3}},{multi:true},cb);
//默认会删除掉全部匹配的文档
//如果希望最多只删除匹配到的一条
PersonModel.remove({name:new RegExp(/zfpx/)},cb)

