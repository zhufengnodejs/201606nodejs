var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/201606blog');
var PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    courses:[String]
});
var PersonModel = mongoose.model('Person',PersonSchema);
console.time('cost');
PersonModel.create({name:'zfpx'},function(err,doc){
    PersonModel.findById(doc._id,function(err,doc){
        doc.courses.push('node');
        setTimeout(function(){
            doc.save(function(err,doc){
                console.log(doc);
            });
        },5000);
    })

    PersonModel.findById(doc._id,function(err,doc){
        doc.courses.push('js');
        setTimeout(function(){
            doc.save(function(err,doc){
                console.log(doc);
                console.timeEnd('cost');
            });
        },10000);
    })
});
