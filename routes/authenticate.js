var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var utils = require('../libs/utils');
var authenticate = require('../models/authenticate');
var paycfg = require('../configs/paycfg');
var AccountLevels = require('../middlewares/AccountLevels');

//login
router.get('/login', function(req, res, next) {
    res.render('authenticate/user-login');
});

router.post('/login', function(req, res, next) {
    var userName = req.body.userName || '';
    var passWord = req.body.passWord || '';

    if(userName === '' || passWord === '') {
        res.redirect('/authenticate/login');
        return;
    }

    var postData = querystring.stringify({
        'loginName': userName,
        'passWord': passWord
    });

    authenticate.login(postData, function(ret) {
        console.log("=====login=====" + ret);
        var ret = JSON.parse(ret);
        var theUser = ret.result;

        if (ret.errorCode === 0) {
            req.session.theUser = theUser;
            req.session.theUser.pidImgs = {};
            res.redirect('/');
        } else if (ret.errorCode === 2) {
            req.session.theUser = theUser;
            req.session.theUser.pidImgs = {};
            res.redirect('/CreateAccountOrder/register/account-order');
        } else {
            res.render('authenticate/user-login');
        }
    });
});

//logout
router.get('/logout', function(req, res, next) {
    req.session.theUser = '';
    res.redirect('/authenticate/login');
});

//register
router.get('/register', AccountLevels, function(req, res, next) {
    res.locals.layout = 'layouts/user_register_layout';
    res.render('authenticate/user-register', {

    });
});

router.post('/register', function(req, res, next) {
    var postData = querystring.stringify({
        'level': req.body.level,
        'userName': req.body.userName,
        'passWord': req.body.passWord,
        'certificateNo': req.body.certificateNo,
        'email': req.body.email,
        'mobile': req.body.mobile,
        'verifyCode': req.body.verifyCode,
        'checkVerifyCode': false,
      //  'isAgent': req.body.isAgent || 0,
        'isAgent': 0,
        'recommender': req.body.recommender
    });

    authenticate.register(postData, function(ret) {
        console.log(ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            req.session.theUser = ret.result;
            if (ret.result.status === 1) {
              res.redirect('/');
            }else {
              res.redirect('/CreateAccountOrder/register/account-order');
            }
        } else {
            res.locals.layout = 'layouts/user_register_layout';
            res.render('authenticate/user-register', {
                failure: true,
                error: ret.errorMessage
            });
        }
    });

});

module.exports = router;
