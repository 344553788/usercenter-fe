var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var DrawbackRule = require('../models/DrawbackRule');
var mywallet = require('../models/mywallet');

router.get('/', function(req, res, next) {
    var queryData = req.session.theUser.profileNo;
    mywallet.moneySummary(queryData, function(ret) {
        console.log('----------mywallet summary:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('mywallet/MoneySummary', {
                theUser: req.session.theUser,
                summary: ret.result,
                active: { my_wallet: true }
            });
        } else {

        }
    });
});

router.get('/shop', function(req, res, next) {
    var queryData = req.session.theUser.profileNo;
    mywallet.moneySummary(queryData, function(ret) {
        console.log('----------mywallet shop summary:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/sellercenter_layout';

            var orderTab = req.query.orderTab || '';

            var pageParams = '&orderTab=' + orderTab;

            var active = {};
            active[orderTab] = true;

            res.render('mywallet/MoneySummaryShop', {
                theUser: req.session.theUser,
                summary: ret.result,
                active: active,
                pageParams: pageParams
            });
        } else {

        }
    });
});

router.get('/MoneyDetails', function(req, res, next) {
    var queryData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'tradeType': req.query.tradeType || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    mywallet.moneyDetails(queryData, function(ret) {
        console.log('-----moneyDetails-----', ret);
        var ret = JSON.parse(ret);

        if(ret.errorCode === 0) {
          if(req.query.shop){
            res.locals.layout = 'layouts/sellercenter_layout';
          }else{
            res.locals.layout = 'layouts/usercenter_layout';
          }

            var tradeType = req.query.tradeType || '';
            var tabId = req.query.tabId || '';
            var pageParams = '&tradeType=' + tradeType
                            + '&tabId=' + tabId;

            res.render('mywallet/MoneyDetails', {
                theUser: req.session.theUser,
                records: ret.result.records,
                page: ret.result.page,
                shop:req.query.shop,
                active: { my_wallet: true },
                tabId: tabId,
                pageParams: pageParams
            });
        }else {

        }

    });
});

//Recharge wallet
router.get('/RechargeWallet', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';

    res.render('mywallet/RechargeWallet', {
        theUser: req.session.theUser,
        active: { my_wallet: true }
    });
});


//alipay get
router.get('/DrawbackWallet_Gold', function(req, res, next) {
    DrawbackRule.drawbackRule(function(ret) {
        console.log('----------mywallet DrawbackWallet_Ali DrawbackRule:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            if(req.query.shop){
              res.locals.layout = 'layouts/sellercenter_layout';
            }else{
              res.locals.layout = 'layouts/usercenter_layout';
            }

            res.render('mywallet/DrawbackWallet_Gold', {
                theUser: req.session.theUser,
                DrawbackRate: ret.result,
                shop:req.query.shop,
                active: { my_wallet: true }
            });
        }else {
          if(req.query.shop){
            res.locals.layout = 'layouts/sellercenter_layout';
          }else{
            res.locals.layout = 'layouts/usercenter_layout';
          }

            res.render('mywallet/DrawbackWallet_Gold', {
                theUser: req.session.theUser,
                DrawbackRate: '?',
                active: { my_wallet: true }
            });
        }
    });
});

//alipay get
router.get('/DrawbackWallet_Cash', function(req, res, next) {
    DrawbackRule.drawbackRule(function(ret) {
        console.log('----------mywallet DrawbackWallet_Ali DrawbackRule:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            if(req.query.shop){
              res.locals.layout = 'layouts/sellercenter_layout';
            }else{
              res.locals.layout = 'layouts/usercenter_layout';
            }

            res.render('mywallet/DrawbackWallet_Cash', {
                theUser: req.session.theUser,
                DrawbackRate: ret.result,
                shop:req.query.shop,
                active: { my_wallet: true }
            });
        }else {
            if(req.query.shop){
              res.locals.layout = 'layouts/sellercenter_layout';
            }else{
              res.locals.layout = 'layouts/usercenter_layout';
            }

            res.render('mywallet/DrawbackWallet_Cash', {
                theUser: req.session.theUser,
                DrawbackRate: '?',
                active: { my_wallet: true }
            });
        }
    });
});
//alipay post
router.post('/DrawbackWallet_Gold', function(req, res, next) {
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'bankCode': req.session.theUser.userBank.alipay.bankCode,
        'bankType': 1,
        'amount': req.body.amount,
        'verifyCode': req.body.verifyCode,
        'cashType': req.body.cashType || 0
    });

    mywallet.moneyDrawback(postData, function(ret) {
        console.log('----------mywallet moneyDrawback_ali:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            if(req.body.shop){
              res.locals.layout = 'layouts/sellercenter_layout';
            }else{
              res.locals.layout = 'layouts/usercenter_layout';
            }

            res.render('mywallet/DrawbackWallet_Gold', {
                theUser: req.session.theUser,
                success: true,
                shop:req.body.shop,
                active: { my_wallet: true }
            });
        } else {
          if(req.body.shop){
            res.locals.layout = 'layouts/sellercenter_layout';
          }else{
            res.locals.layout = 'layouts/usercenter_layout';
          }

            res.render('mywallet/DrawbackWallet_Gold', {
                theUser: req.session.theUser,
                failure: true,
                errorMessage:ret.errorMessage,
                shop:req.body.shop,
                active: { my_wallet: true }
            });
        }
    });
});

//alipay post
router.post('/DrawbackWallet_Cash', function(req, res, next) {
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'bankCode': req.session.theUser.userBank.alipay.bankCode,
        'bankType': 1,
        'amount': req.body.amount,
        'verifyCode': req.body.verifyCode,
        'cashType': req.body.cashType || 0
    });

    mywallet.moneyDrawback(postData, function(ret) {
        console.log('----------mywallet moneyDrawback_ali:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            if(req.body.shop){
              res.locals.layout = 'layouts/sellercenter_layout';
            }else{
              res.locals.layout = 'layouts/usercenter_layout';
            }

            res.render('mywallet/DrawbackWallet_Cash', {
                theUser: req.session.theUser,
                success: true,
                shop:req.body.shop,
                active: { my_wallet: true }
            });
        } else {
          if(req.body.shop){
            res.locals.layout = 'layouts/sellercenter_layout';
          }else{
            res.locals.layout = 'layouts/usercenter_layout';
          }

            res.render('mywallet/DrawbackWallet_Cash', {
                theUser: req.session.theUser,
                failure: true,
                errorMessage:ret.errorMessage,
                shop:req.body.shop,
                active: { my_wallet: true }
            });
        }
    });
});

//wechatpay --get
router.get('/DrawbackWallet_Wechat', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';

    res.render('mywallet/DrawbackWallet_Wechat', {
        theUser: req.session.theUser,
        active: { my_wallet: true }
    });
});

//wechatpay post
router.post('/DrawbackWallet_Wechat', function(req, res, next) {
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'bankCode': req.session.theUser.userBank.wepay.bankCode,
        'bankType': 2,
        'amount': req.body.amount
    });

    mywallet.moneyDrawback(postData, function(ret) {
        console.log('----------mywallet moneyDrawback_wechat:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('mywallet/DrawbackWallet_Wechat', {
                theUser: req.session.theUser,
                success: true,
                active: { my_wallet: true }
            });
        } else {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('mywallet/DrawbackWallet_Wechat', {
                theUser: req.session.theUser,
                failure: true,
                errorMessage:ret.errorMessage,
                active: { my_wallet: true }
            });
        }
    });
});

//toGold --get
router.get('/toGold', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';

    res.render('mywallet/ToGold', {
        theUser: req.session.theUser,
        active: { my_wallet: true }
    });
});

//toGold post
router.post('/toGold', function(req, res, next) {
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'amount': req.body.amount
    });

    mywallet.toGold(postData, function(ret) {
        console.log('----------mywallet toGold:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('mywallet/ToGold', {
                theUser: req.session.theUser,
                success: true,
                active: { my_wallet: true }
            });
        } else {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('mywallet/ToGold', {
                theUser: req.session.theUser,
                failure: true,
                active: { my_wallet: true }
            });
        }
    });
});

module.exports = router;
