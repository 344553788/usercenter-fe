var express = require('express');
var router = express.Router();
var querystring = require('querystring');

router.get('/', function(req, res, next) {
	res.locals.layout = 'layouts/sellercenter_layout';
    res.render('SellerShop/SellerOrderList', {
        theUser: req.session.theUser,
        active: { shop_settings: true }
    });
});

module.exports = router;