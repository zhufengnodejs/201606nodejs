var persons = [];
for(var i=1;i<=10;i++){
    persons.push({_id:i,name:'zfpx'+i});
}
var skip=limit=0;
var mongo = {
    persons,
    skip,
    limit,
    skip(num){
        this.skip = num;
        return this;
    },
    limit(num){
        this.limit = num;
        return this;
    },
    exec(){//执行真正的查询
        process.nextTick(()=>{
            console.log(this.persons.slice(this.skip,this.skip+this.limit));
        },500)
        return this;
    }
}

mongo.exec().skip(3).limit(3);
