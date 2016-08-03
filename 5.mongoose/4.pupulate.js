var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/201606blog');
//定义课程Schema
var CourseSchema = new mongoose.Schema({
    name:String
});
//定义课程Model
var CourseModel = mongoose.model('Course',CourseSchema);
/*CourseModel.create([
 {name:'node.js'},
 {name:'化学'}
 ]);*/

//定义一个模型骨架，它不能直接操作数据库
var PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    // 外键 别的集合的主键
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course' //指明此外键是哪个集合中的外键
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
    //增加一个爱好的属性，类型是字符串
    hobby:[String],
    home:String,
    birthday:{type:Date,required:true,default:Date.now}
    //如果你想固定下来集合的名称，需要加这样一个参数
});

var PersonModel = mongoose.model('Person',PersonSchema);
/*PersonModel.create({
 name:'zfpx',
 age:8,
 gender:'男',
 home:'北京',
 hobby:['smoking'],
 course:'579c52174c60d0041106695d'
 });*/
// populate 把外键变成外键对应对象
/*PersonModel.findOne({}).populate('course').exec(function(err,doc){
 console.log(doc);
 });*/
/*
 PersonModel.findOne({},function(err,doc){
 console.log(doc.course);
 CourseModel.findById(doc.course,function(err,course){
 console.log(course);
 doc.course = course.name;
 console.log(doc);
 })
 })*/
// version版本号 实现并发控制的

//1, 579c579dddc60a201be97eab
// 增加一个爱好 年龄累加1 名字改了
/*PersonModel.update({_id:'579c579dddc60a201be97eab'},
 {$push:{hobby:'drinking'}},
 function(err,result){
 if(err)
 console.error(err);
 else
 console.log(result);
 }
 );*/
PersonModel.findById('579c579dddc60a201be97eab',function(err,doc){
    //entity 单个文档对象
    //当你去修改数组的时候会增加
    // doc.__v = 4;
    doc.age = doc.age+1;
    doc.name = 'zfpx3';
    doc.hobby.push('bbb');
    doc.save(function(err,result){
        console.log(err);
        console.log(result);
        setTimeout(function(){
            doc.save(function(err,result){
                console.log(err);
                console.log(result);
            });
        },10000)
    });
})