var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var CreateAccountOrder = require('../models/CreateAccountOrder');

//generate account order -- register
router.get('/register/account-order', function(req, res, next) {
    console.log('-----register-----account-order----');
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'userName': req.session.theUser.userName,
        'currentLevel': req.session.theUser.level,
        'targetLevel': req.session.theUser.level,
        'remark': ''
    });

    CreateAccountOrder.generateOrder(postData, function(ret) {
        console.log(ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/user_register_layout';

            res.render('authenticate/account-payment', {
                orderPrice: ret.result.orderPrice,
                orderNo: ret.result.orderNo
            });
        } else {
            res.redirect('/authenticate/login');
        }
    });
});

//upgrade level
router.get('/upgradelevel/:level', function(req, res, next) {
    var upgradeLevel = req.params.level;
    res.redirect('/CreateAccountOrder/upgrade/account-order?upgradeLevel=' + upgradeLevel);
});

//generate order -- upgrade
router.get('/upgrade/account-order', function(req, res, next) {
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'userName': req.session.theUser.userName,
        'currentLevel': req.session.theUser.level,
        'targetLevel': req.query.upgradeLevel,
        'remark': ''
    });

    CreateAccountOrder.generateOrder(postData, function(ret) {
        console.log(ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/user_register_layout';

            res.render('authenticate/account-payment', {
                orderPrice: ret.result.orderPrice,
                orderNo: ret.result.orderNo,
                active: { account_upgrade: true }
            });
        } else {
            res.redirect('/accountsettings/basic-info');
        }
    });
});

//generate order -- recharge
router.post('/recharge/account-order', function(req, res, next) {
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'orderPrice': req.body.price,
        'remark': ''
    });

    CreateAccountOrder.generateRechargeOrder(postData, function(ret) {
        console.log(ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/user_register_layout';

            res.render('authenticate/account-payment', {
                orderPrice: ret.result.orderPrice,
                orderNo: ret.result.orderNo,
                active: { account_upgrade: true }
            });
        } else {
            res.redirect('/mywallet');
        }
    });
});


module.exports = router;