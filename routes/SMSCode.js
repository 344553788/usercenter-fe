var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var SMSCode = require('../models/smscode');

//sms code
router.post('/', function(req, res, next) {
    var postData = querystring.stringify({
        'to': req.body.to || ''
    });

    SMSCode.obtain_smscode(postData, function(ret) {
        console.log('----------sms code:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {

            res.jsonp(ret);
        } else {

        }
    });
});


module.exports = router;