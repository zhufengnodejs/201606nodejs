var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/201606blog');
//定义课程Schema
var CourseSchema = new mongoose.Schema({
    name:String
});
var CourseModel = mongoose.model('Course',CourseSchema);
var PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    // 外键 别的集合的主键
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course' //指明此外键是哪个集合中的外键
    }
});
var PersonModel = mongoose.model('Person',PersonSchema);
CourseModel.create({name:'node.js'},function(err,course){
    PersonModel.create({name:'zfpx',course:course._id},function(err,doc){
        console.log(doc);
        PersonModel.findById(doc._id).populate('course').exec(function(err,doc){
            console.log(doc);
        })
    })
});