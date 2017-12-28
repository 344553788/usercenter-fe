var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var Shop = require('../models/Shop');

// shop list
router.get('/', function(req, res, next) {
    var queryData = querystring.stringify({
        'shopName': req.query.shopName || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '16'
    });

    Shop.shopList(queryData, function(ret) {
        console.log('----------shoplist:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = false;

            res.render('Shop/ShopList', {
                theUser: req.session.theUser,
                nav: ret.result.nav,
                shops: ret.result.shops,
                page: ret.result.page
            });
        } else {

        }
    });
});

// shop detail
router.get('/ShopDetail/:shopId', function(req, res, next) {
    var queryData = querystring.stringify({
        'shopId': req.params.shopId,
        'name': req.query.name || '',
        'cateId': req.query.cateId || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '12'
    });

    Shop.shopDetail(queryData, function(ret) {
        console.log('----------ShopDetail:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = false;
            var cateId = req.query.cateId || '';
            var name = req.query.name || '';

            var pageParam = '&cateId=' + cateId + '&name=' + name;
            res.render('Shop/ShopDetail', {
                theUser: req.session.theUser,
                nav: ret.result.nav,
                cates: ret.result.cates,
                shop: ret.result.shop,
                products: ret.result.products,
                condition: ret.result.condition,
                page: ret.result.page,
                pageParam: pageParam
            });
        } else {

        }
    });
});

module.exports = router;