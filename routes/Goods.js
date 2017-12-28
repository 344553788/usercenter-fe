var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var Goods = require('../models/Goods');

// goods list
router.get('/:cateId', function(req, res, next) {
    var queryData = querystring.stringify({
        'cateId': req.params.cateId || '',
        'name': req.query.name || '',
        'shopId': req.query.shopId || '',
        'isOn': true,
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '12'
    });

    Goods.goodsList(queryData, function(ret) {
        console.log('----------goods list:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = false;

            res.render('Goods/GoodsList', {
                theUser: req.session.theUser,
                nav: ret.result.nav,
                products: ret.result.products,
                page: ret.result.page,
                condition: ret.result.condition
            });
        } else {

        }
    });
});

// goods detail
router.get('/goodsDetail/:productCode', function(req, res, next) {
    var queryData = req.params.productCode || '';

    Goods.goodsDetail(queryData, function(ret) {
        console.log('----------goods detail:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            var firtCategory = ret.result.belong;
            var secondCategory = firtCategory.subCategory;
            var thirdCategory = secondCategory.subCategory;

            var currentPrice = ret.result.product.skus[0].salePrice;
            var currentQuantity = ret.result.product.skus[0].quantity;
            res.locals.layout = false;

            res.render('Goods/GoodsDetail', {
                theUser: req.session.theUser,
                nav: ret.result.nav,
                shop: ret.result.shop,
                product: ret.result.product,
                cates: ret.result.cates,
                firtCategory: firtCategory,
                secondCategory: secondCategory,
                thirdCategory: thirdCategory,
                currentPrice: currentPrice,
                currentQuantity: currentQuantity
            });
        } else {

        }
    });
});

// shop goods list
router.get('/shop/:shopId', function(req, res, next) {
    var queryData = querystring.stringify({
        'cateId': req.query.cateId || '',
        'name': req.query.name || '',
        'shopId': req.params.shopId || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    Goods.shopGoodsList(queryData, function(ret) {
        console.log('----------shop goods list:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = false;

            res.render('Goods/GoodsList', {
                theUser: req.session.theUser,
                nav: ret.result.nav,
                products: ret.result.products,
                page: ret.result.page,
            });
        } else {

        }
    });
});

module.exports = router;