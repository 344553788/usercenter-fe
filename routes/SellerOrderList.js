var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var ShopOrder = require('../models/ShopOrder');

router.get('/', function(req, res, next) {
    var queryData = querystring.stringify({
        'shopId': req.session.theUser.shop.id,
        'orderNo': req.query.orderNo || '',
        'orderStatus': req.query.orderStatus || '',
        'shippingStatus': req.query.shippingStatus || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    ShopOrder.orderlist(queryData, function(ret) {
        console.log('----------sellerorderlist:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/sellercenter_layout';

            var orderStatus = req.query.orderStatus || '';
            var shippingStatus = req.query.shippingStatus || '';
            var orderTab = req.query.orderTab || '';
        
            var pageParams = '&orderStatus=' + orderStatus 
                            + '&shippingStatus=' + shippingStatus
                            + '&orderTab=' + orderTab;

            var active = {};
            active[orderTab] = true;
            
            res.render('SellerOrderList/SellerOrderList', {
                theUser: req.session.theUser,
                orders: ret.result.orders,
                page: ret.result.page,
                active: active,
                pageParams: pageParams
            });
        } else {

        }
    });
});

//agent orderlist
router.get('/agentOrderList', function(req, res, next) {
    var queryData = querystring.stringify({
        'shopId': req.session.theUser.shop.id,
        'orderNo': req.query.orderNo || '',
        'agentNo': req.query.agentNo || '',
        'status': req.query.status || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    ShopOrder.agentOrderlist(queryData, function(ret) {
        console.log('----------seller agent orderlist:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/sellercenter_layout';

            var status = req.query.status || '';
            
            res.render('SellerOrderList/SellerAgentOrderList', {
                theUser: req.session.theUser,
                orders: ret.result.orders,
                page: ret.result.page,
                active: { seller_agent_orders: true }
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
            res.locals.layout = 'layouts/sellercenter_layout';

            res.render('SellerOrderList/SellerOrderDetail', {
                theUser: req.session.theUser,
                orderdetail: ret.result,
                page: ret.result.page,
                active: { my_order: true }
            });
        } else {

        }
    });
});

router.get('/orderShipping', function(req, res, next) {
    console.log('--------orderShipping---');
    var orderNo = req.query.orderNo;
    var shippingCompany = req.query.shippingName;
    var invoiceNo = req.query.invoiceNo;
    
    var queryData = querystring.stringify({
        'orderNo': req.query.orderNo || '',
        'shippingCompany': req.query.shippingCompany || '',
        'invoiceNo': req.query.invoiceNo || ''
    });

    ShopOrder.shippingOrder(queryData, function(ret) {
        console.log('----------orderShipping:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.redirect(req.headers.referer);
        } else {

        }
    });
});

// agent order cancel
router.get('/agentOrderCancel/:orderNo', function(req, res, next) {
    var orderNo = req.params.orderNo;

    ShopOrder.cancelAgentOrder(orderNo, function(ret) {
        console.log('----------cancelAgentOrder:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.redirect('/SellerOrderList/agentOrderList');
        } else {

        }
    });
});

module.exports = router;