var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var MyAddress = require('../models/MyAddress');

router.get('/', function(req, res, next) {
	var queryData = req.session.theUser.profileNo;

	MyAddress.addressList(queryData, function(ret) {
		console.log('----------addressList', ret);
		var ret = JSON.parse(ret);

		if(ret.errorCode === 0) {
			res.locals.layout = "layouts/usercenter_layout";
		    res.render('MyAddress/MyAddress', {
		    	theUser: req.session.theUser,
		    	addressList: ret.result,
		        active: { my_address: true }
		    });
		}
	}); 
});

router.post('/newAddress', function(req, res, next) {
	var postData = querystring.stringify({
		'profileNo': req.session.theUser.profileNo,
		'receiver': req.body.receiver,
		'mobile': req.body.mobile,
		'address': req.body.address,
		'zipCode': req.body.zipCode,
		'isDefault': req.body.isDefault === undefined ? '0' : '1'
	});

	MyAddress.addressNew(postData, function(ret) {
		console.log('--------newAddress', ret);
		var ret = JSON.parse(ret);

		if(ret.errorCode === 0) {
			res.redirect('/MyAddress');
		}
	});
});

router.post('/newAddress/ajax', function(req, res, next) {
	var postData = querystring.stringify({
		'profileNo': req.session.theUser.profileNo,
		'receiver': req.body.receiver,
		'mobile': req.body.mobile,
		'address': req.body.address,
		'zipCode': req.body.zipCode,
		'isDefault': req.body.isDefault === undefined ? '0' : '1'
	});

	MyAddress.addressNew(postData, function(ret) {
		console.log('-----ajax---newAddress', ret);
		var ret = JSON.parse(ret);

		if(ret.errorCode === 0) {
			res.json(ret.result);
		}
	});
});

router.post('/updateAddress', function(req, res, next) {
	var postData = querystring.stringify({
		'id': req.body.id,
		'profileNo': req.session.theUser.profileNo,
		'receiver': req.body.receiver,
		'mobile': req.body.mobile,
		'address': req.body.address,
		'zipCode': req.body.zipCode,
		'isDefault': req.body.isDefault === undefined ? '0' : '1'
	});

	MyAddress.addressUpdate(postData, function(ret) {
		console.log('--------newAddress', ret);
		var ret = JSON.parse(ret);

		if(ret.errorCode === 0) {
			res.redirect('/MyAddress');
		}
	});
});


router.post('/deleteAddress', function(req, res, next) {
	var postData = req.body.id;
	
	MyAddress.addressDelete(postData, function(ret) {
		console.log('--------deleteAddress', ret);
		var ret = JSON.parse(ret);

		if(ret.errorCode === 0) {
			res.redirect('/MyAddress');
		}
	});
});

module.exports = router;