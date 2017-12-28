var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var EmailCode = require('../models/EmailCode');

//email code
router.post('/', function(req, res, next) {
    var postData = querystring.stringify({
        'email': req.body.email || ''
    });

    EmailCode.obtain_emailcode(postData, function(ret) {
        console.log('----------email code:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {

            res.jsonp(ret);
        } else {

        }
    });
});


module.exports = router;