var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var ShopOrder = require('../models/ShopOrder');

// orderlist
router.get('/', function(req, res, next) {
    var queryData = querystring.stringify({
       	'profileNo': req.session.theUser.profileNo,
       	'orderNo': req.query.orderNo || '',
       	'orderStatus': req.query.orderStatus || '',
        'shippingStatus': req.query.shippingStatus || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    ShopOrder.orderlist(queryData, function(ret) {
        console.log('----------orderlist:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            var orderStatus = req.query.orderStatus || '';
            var shippingStatus = req.query.shippingStatus || '';
            var tabId = req.query.tabId || '';
            var pageParams = '&orderStatus=' + orderStatus 
                            + '&shippingStatus=' + shippingStatus 
                            + '&tabId=' + tabId;

            res.render('orderlist/buyer-orderlist', {
                theUser: req.session.theUser,
                orders: ret.result.orders,
                page: ret.result.page,
                active: { my_order: true },
                pageParams: pageParams,
                tabId: tabId
            });
        } else {

        }
    });
});

// order details
router.get('/orderdetails/:orderNo', function(req, res, next) {
    var orderNo = req.params.orderNo;

    ShopOrder.orderdetail(orderNo, function(ret) {
        console.log('----------orderdetails:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('orderlist/buyer-orderdetail', {
                theUser: req.session.theUser,
                orderdetail: ret.result,
                page: ret.result.page,
                active: { my_order: true }
            });
        } else {

        }
    });
});

//PayforOrder
router.get('/PayforOrder', function(req, res, next) {
    var orderAmount = req.query.orderAmount;
    var orderNo = req.query.orderNo;
    var hiddenAgentPay = false;

    if(orderNo) {
        hiddenAgentPay = orderNo.charAt(0).toUpperCase() === 'D' ? true : false;
    }

    res.locals.layout = 'layouts/user_register_layout';

    res.render('ShopOrderPayment/order_payment', {
        theUser: req.session.theUser,
        orderAmount: orderAmount,
        orderNo: orderNo,
        hiddenAgentPay: hiddenAgentPay
    });
});

//cancel order
router.get('/cancelOrder', function(req, res, next) {
    var queryData = querystring.stringify({
        orderNo: req.query.orderNo,
        reason: req.query.cancelReason || '',
    });

    ShopOrder.cancelOrder(queryData, function(ret) {
        console.log('-----cancelOrder-----:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.redirect(req.headers.referer);
        } else {

        }
    });
});

//order done
router.get('/orderDone', function(req, res, next) {
    var queryData = req.query.orderNo;

    ShopOrder.orderDone(queryData, function(ret) {
        console.log('-----orderDone-----:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.redirect(req.headers.referer);
        } else {

        }
    });
});

module.exports = router;