var crypto = require('crypto');
function sign(val,secret){
    return val + '.' + crypto.createHmac('sha256',secret)
    .update(val).digest('base64').replace(/\=+/,'');
}
console.log(sign('1','zfpx'));
// 1.Ra0vLMhEw1Kry9JuZM1EQHw4C9ceglV+azxgqPTS+AE
// 100.Ra0vLMhEw1Kry9JuZM1EQHw4C9ceglV+azxgqPTS+AE