var Promise = function(fn){
    var status = '初始态';
    var resolve = (data) => {
        status = '成功态';
        this.success(data);
    }
    var reject = (reason) => {
        status = '失败态';
        this.fail(reason);
    }
    fn(resolve,reject);
}
Promise.prototype.then = function(onSuccess,onFail){
    this.success = onSuccess;//暂时保存成功回调
    this.fail = onFail; //失败回调
}


module.exports = Promise;