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
//保存前执行一个中间件
/*PersonSchema.pre('save',function(next){
    setTimeout(()=>{
        this.age = this.age * 2;//this 指向 entity
        next();
    },5000)
});*/
PersonSchema.pre('save',function(next,done){
    next();
    setTimeout(()=>{
        console.log('保存实体',this);
        done();
    },5000);
});
//增加entity方法
PersonSchema.methods.findSameAge = function(cb){
    //先获取模型 再调用find 把条件传入，调用回调
    this.model('Person').find({age:this.age},cb);
}
//给模型增加新的方法 update remove
PersonSchema.statics.findByName = function(name,cb){
    this.find({name:new RegExp(name,'i')},cb)
}
//},{collection:'person'});
//定义模板,它可以操作数据库
//二个参数表示定义一个模型
//集合的名称 模型名->转小写->复数     Person>person>people
var PersonModel = mongoose.model('Person',PersonSchema);
//为 entity增加实例方法，寻找跟自己年龄相同的人
/*PersonModel.find({name:'zfpx'},function(){

});*/
PersonModel.findByName('zfpx',function(err,docs){
  console.log(docs.length);
})


/*
//一个参数表示获取一个模型
var p2 = mongoose.model('Person');
console.log(PersonModel === p2);*/
//传入要保存到集合中的文档
//实体是集合中的一个文件
var PersonEntity = new PersonModel({
    name:'zfpx',
    age:20,
    gender:'男',
    home:'北京',
    //birthday:new Date(Date.now() - 1000 * 60 * 60 *24 *365 *8)
});


console.log(PersonEntity.name,PersonEntity.age,PersonEntity.birthday);
//异步保存数据库，保存成功之后调用回调函数
PersonEntity.save(function(err,doc){
  if(err){
      console.error(err);
  }else{
      console.log(doc);
      //凡是从数据库里查出来的对象都是entity
      doc.findSameAge(function(err,docs){
          console.log(docs.length);
      })
  }
});
