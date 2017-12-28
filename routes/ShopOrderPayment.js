var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var ShopOrder = require('../models/ShopOrder');
var payment = require('../models/payment');
var paycfg = require('../configs/paycfg');

//wechatpay
router.post('/wechatpay', function(req, res, next) {
    //get order totalAmount
    var queryData = req.body.orderNo;

    ShopOrder.orderAmount(queryData, function(ret) {
        console.log('-----orderAmount:', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            var postData = JSON.stringify({
                "itemName": "商品订单",
                "notifyURL": paycfg.wechatpay_order.notifyURL,
                "orderNo": req.body.orderNo,
                "returnURL": paycfg.wechatpay_order.returnURL,
                "systemId": 1,
                "amount": ret.result.orderAmount,
                //"amount": 0.01,

                "institution": "wepay",
                "ipAddress": paycfg.wechatpay_order.ipAddress
            });

            payment.prepay(postData, function(ret) {
                console.log(ret);
                var ret = JSON.parse(ret);

                if (ret.errorCode === 0) {
                    res.locals.wechatpayFeedback = ret.result;

                    res.render('ShopOrderPayment/order_payment_wechat_qrcode', {
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

    ShopOrder.orderAmount(queryData, function(ret) {
        console.log('-----orderAmount:', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {

            var postData = JSON.stringify({
                "itemName": "商品订单",
                "notifyURL": paycfg.alipay_order.notifyURL,
                "orderNo": req.body.orderNo,
                "returnURL": paycfg.alipay_order.returnURL,
                "systemId": 1,
                "amount": ret.result.orderAmount,
                //"amount": 0.02,

                "institution": "alipay",
                "ipAddress": paycfg.alipay_order.ipAddress
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


//shoppay
router.post('/shoppay', function(req, res, next) {
    var postData = querystring.stringify({
        'orderNo': req.body.orderNo
    });

    console.log('---------------orderNo:', postData);
    ShopOrder.orderAgent(postData, function(ret) {
        console.log('-----shoppay:', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/user_register_layout';
            res.render('ResultStatus/Success', {
                theUser: req.session.theUser
            });
        } else {
            res.locals.layout = 'layouts/user_register_layout';
            res.render('ResultStatus/Failure', {
                theUser: req.session.theUser
            });
        }
    });
});


//nabipay
router.post('/nabipay', function(req, res, next) {
    var postData = querystring.stringify({
        'orderNo': req.body.orderNo,
        'cashType': 2,
        'profileNo': req.session.theUser.profileNo
    });

    console.log('---------------orderNo:', postData);
    ShopOrder.nabiPay(postData, function(ret) {
        console.log('-----nabipay:', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/user_register_layout';
            res.render('ResultStatus/Success', {
                theUser: req.session.theUser
            });
        } else {
            res.locals.layout = 'layouts/user_register_layout';
            res.render('ResultStatus/Failure', {
                theUser: req.session.theUser
            });
        }
    });
});

module.exports = router;
