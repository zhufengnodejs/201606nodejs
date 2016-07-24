var express = require('express');
var app = express();
app.use(require('cookie-parser')());
var sessions = {};//存放着所有的顾客sessoin的窗口
const SESSION_KEY = 'connect.sid';
app.get('/visit',function(req,res){
    var cardNo = req.cookies[SESSION_KEY];// 把请求头中的cookie字段转成对象
    if(cardNo && sessions[cardNo]){
        var sessionObj = sessions[cardNo];
        sessionObj.balance -= 10;
        res.send(`欢迎你，老顾客，你的剪发卡还剩${sessionObj.balance}元`);
    }else{
        var cardNo = ""+Date.now()+Math.random();//编制卡号
        sessions[cardNo] = {//在服务器端的内存里记录此卡号对应的余额
            balance:100
        }
        res.cookie(SESSION_KEY,cardNo);
        res.send('欢迎你，新顾客，送你一张100元的剪发卡');
    }
});

app.listen(9090);