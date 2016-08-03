var Promise = function(fn){
    this.status = '初始态';
    fn(this.resolve.bind(this),this.reject.bind(this));
}
Promise.prototype.resolve = function(data){
    this.status = '成功态';
    this.success(data);
}
Promise.prototype.reject = function(reason){
    this.status = '失败态';
    this.fail(reason);
}
Promise.prototype.then = function(onSuccess,onFail){
    this.success = onSuccess;//暂时保存成功回调
    this.fail = onFail; //失败回调
}


module.exports = Promise;