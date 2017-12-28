var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var MyCollection = require('../models/MyCollection');

// shop collection
router.get('/', function(req, res, next) {
	res.locals.layout = 'layouts/usercenter_layout';
	res.render('MyCollection/ShopCollection');
});

// goods collection
router.get('/goodsCollection', function(req, res, next) {
	res.locals.layout = 'layouts/usercenter_layout';
	res.render('MyCollection/ShopCollection');
});


module.exports = router;