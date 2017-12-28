var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var httpreq = require('../libs/httpreq');

//homepage
router.get('/', function(req, res, next) {
        var code =  req.query.code;
        console.log('------code-----', code);
        var url1 = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf9322dc193b4f7a5&secret=d4624c36b6795d1d99dcf0547af5443d&code='+code+'&grant_type=authorization_code';
        httpreq.get(url1,function(ret) {
            console.log('----------ret:' + ret);

            var ret = JSON.parse(ret);
            var access_token = ret.access_token;
            var openid = ret.openid;

            var url2 = 'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid;
            httpreq.get(url2,function(ret1) {
               console.log('----------ret1:' + ret1);

            });
        });
});

module.exports = router;
