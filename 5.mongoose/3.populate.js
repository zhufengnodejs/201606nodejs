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
    course:'579c52174c60d0041106695d'
});*/
// populate 把外键变成外键对应对象
PersonModel.findOne({}).populate('course').exec(function(err,doc){
    console.log(doc);
});
/*
PersonModel.findOne({},function(err,doc){
    console.log(doc.course);
    CourseModel.findById(doc.course,function(err,course){
        console.log(course);
        doc.course = course.name;
        console.log(doc);
    })
})*/
