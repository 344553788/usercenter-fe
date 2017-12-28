var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var ShoppingCart = require('../models/ShoppingCart');

router.get('/', function(req, res, next) {
	var queryData = querystring.stringify({
		'profileNo': req.session.theUser.profileNo,
		'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
	});

	ShoppingCart.ShoppingCartList(queryData, function(ret) {
		console.log('-------ShoppingCartList--', ret);

		var ret = JSON.parse(ret);

		if(ret.errorCode === 0) {
			res.locals.layout = false;
    		res.render('ShoppingCart/ShoppingCart', {
    			theUser: req.session.theUser,
               	orders: ret.result.orders,
                page: ret.result.page
    		});
		}else {

		}
	});
});

router.get('/addGoods/:productCode', function(req, res, next) {
	var queryData = querystring.stringify({
		'profileNo': req.session.theUser.profileNo,
		'productCode': req.params.productCode,
		'productNumber': req.query.productNumber,
		'spec': req.query.spec
	});

	ShoppingCart.addGoods(queryData, function(ret) {
		console.log('-------addGoods--', ret);

		var ret = JSON.parse(ret);

		if(ret.errorCode === 0) {
			res.redirect('/ShoppingCart');
		}else {

		}
	});
});

router.get('/deleteGoods/:cartId', function(req, res, next) {
	var deleteData = req.params.cartId;

	ShoppingCart.deleteGoods(deleteData, function(ret) {
		console.log('-------deleteGoods--', ret);

		var ret = JSON.parse(ret);

		if(ret.errorCode === 0) {
			res.redirect('/ShoppingCart');
		}else {

		}
	});
});

module.exports = router;