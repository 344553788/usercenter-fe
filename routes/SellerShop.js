var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var SellerShop = require('../models/SellerShop');

//shop basic settings
router.route('/')
    .get(function(req, res, next) {
    	var queryData = req.session.theUser.profileNo;

        SellerShop.getSellerShopBasicSettings(queryData, function(ret) {
            console.log('----------getSellerShopBasicSettings:' + ret);
            var ret = JSON.parse(ret);

            if (ret.errorCode === 0) {
                res.locals.result = ret.result;

                res.locals.layout = 'layouts/sellercenter_layout';
                res.render('SellerShop/SellerShopBasicSettings', {
                    theUser: req.session.theUser,
                    sellerShopBasicSettings: res.locals.result,
                    active: { shop_basic_settings: true }
                });
            } else {

            }
        });
    })
    .post(function(req, res, next) {
        var postData = querystring.stringify({
        	'profileNo': req.session.theUser.profileNo,
            'shopName': req.body.shopName || '',
            'shopLogo': req.body.shopLogo || '',
            'shopBrief': req.body.shopBrief || '',
            'address': req.body.address || '',
            'introduce': req.body.introduce
        });

        SellerShop.updateSellerShopBasicSettings(postData, function(ret) {
            console.log('----------updateSellerShopBasicSettings:' + ret);
            var ret = JSON.parse(ret);

            if (ret.errorCode === 0) {
                res.locals.result = ret.result;

                req.session.theUser.shop = res.locals.result;
                res.locals.layout = 'layouts/sellercenter_layout';
                res.render('SellerShop/SellerShopBasicSettings', {
                    theUser: req.session.theUser,
                    sellerShopBasicSettings: res.locals.result,
                    success: true,
                    active: { shop_basic_settings: true }
                });
            } else {
            	res.locals.layout = 'layouts/sellercenter_layout';
                res.render('SellerShop/SellerShopBasicSettings', {
                    theUser: req.session.theUser,
                    sellerShopBasicSettings: req.session.theUser.shop,
                    failure: true,
                    active: { shop_basic_settings: true }
                });
            }
        });
    });

module.exports = router;