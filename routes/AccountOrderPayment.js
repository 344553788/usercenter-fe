var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var payment = require('../models/payment');
var AccountOrder = require('../models/AccountOrder');
var paycfg = require('../configs/paycfg');

//wechatpay
router.post('/wechatpay', function(req, res, next) {
    var queryData = req.body.orderNo;

    AccountOrder.orderAmount(queryData, function(ret) {
        console.log('-----orderAmount:', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            var postData = JSON.stringify({
                "itemName": "用户充值订单",
                "notifyURL": paycfg.wechatpay.notifyURL,
                "orderNo": req.body.orderNo,//
                "returnURL": paycfg.wechatpay.returnURL,
                "systemId": 1,
                "amount": ret.result.orderAmount,
                "institution": "wepay",
                "ipAddress": paycfg.wechatpay.ipAddress
            });

            payment.prepay(postData, function(ret) {
                console.log(ret);
                var ret = JSON.parse(ret);

                if (ret.errorCode === 0) {
                    res.locals.wechatpayFeedback = ret.result;

                    res.render('AccountOrderPayment/payment-qrcode', {
                        wechatpay: res.locals.wechatpayFeedback
                    });
                } else {
                    res.redirect('/authenticate/login');
                }
            });

        }else {

        }
    });

});

//alipay
router.post('/alipay', function(req, res, next) {
     //get order totalAmount
    var queryData = req.body.orderNo;

    AccountOrder.orderAmount(queryData, function(ret) {
        console.log('-----orderAmount:', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {

            var postData = JSON.stringify({
                "itemName": "用户充值订单",
                "notifyURL": paycfg.alipay.notifyURL,
                "orderNo": req.body.orderNo,
                "returnURL": paycfg.alipay.returnURL,
                "systemId": 1,
                "amount": ret.result.orderAmount,
                "institution": "alipay",
                "ipAddress": paycfg.alipay.ipAddress
            });

            payment.prepay(postData, function(ret) {
                console.log(ret);
                var ret = JSON.parse(ret);

                if (ret.errorCode === 0) {
                    res.redirect(ret.result.paymentURL);
                } else {

                }
            });

        }else {

        }
    });
});


module.exports = router;