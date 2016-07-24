/**
 * md5加密是一种摘要算法
 * 1. 把任意长度的输入变成固定长度的输出
 *   1. 进行完整性较验
 *   2. 对密码进行加密
 * 2. 不同的输入会产生不同的输出
 * 3. 相同的输入会永远产生相同的输出
 * 4. 不能从输出推算出输入,此计算是不可逆的
 *
 */
var crypto = require('crypto');
//console.log(crypto.getHashes());
var result = crypto.createHash('md5')
    .update('123456')//指定要算的原值
    .update('123')
    .digest('hex') // 摘要输出并指定编码 hex

console.log(result);

var crypto = require('crypto');
//加盐算法 盐值=zfpx
var shasum = crypto.createHmac('sha1', 'zfpx');
var result = shasum.update('123456').digest('hex');
console.log(result);

