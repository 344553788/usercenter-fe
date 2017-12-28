var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var CreateShopOrder = require('../models/CreateShopOrder');

router.post('/', function(req, res, next) {
    var postData = req.body;
    postData['profileNo'] = req.session.theUser.profileNo;

    var queryData = querystring.stringify(postData);

    CreateShopOrder.toOrder(queryData, function(ret) {
         console.log('----------toOrder:' + ret);
         var ret = JSON.parse(ret);

         if (ret.errorCode === 0) {
            res.locals.layout = false;

            res.render('CreateShopOrder/ToOrder', {
                theUser: req.session.theUser,
                address: ret.result.address,
                details: ret.result.details,
                totalFee: ret.result.totalFee
            });
        } else {

        }
    });
   
});

router.post('/order', function(req, res, next) {
    var postData = req.body;

    if(!postData['addressId']) {
        res.redirect('/MyAddress');
        return ;
    }

    postData['profileNo'] = req.session.theUser.profileNo;
     
    postData = querystring.stringify(postData);
    console.log('----------', postData);
    CreateShopOrder.order(postData, function(ret) {
         console.log('----------order:' + ret);
         var ret = JSON.parse(ret);

         if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/user_register_layout';
            res.render('ShopOrderPayment/order_payment', {
                theUser: req.session.theUser,
                orderAmount: ret.result.orderAmount,
                orderNo: ret.result.orderNo
            });
            
        } else {

        }
    });
   
});


module.exports = router;