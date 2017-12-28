var express = require('express');
var router = express.Router();

var authenticate = require('./authenticate');
var SMSCode = require('./SMSCode');
var EmailCode = require('./EmailCode');
var home = require('./home');
var Shop = require('./Shop');
var Goods = require('./Goods');
var orderlist = require('./OrderList');
var MyCollection = require('./MyCollection');
var MyAddress = require('./MyAddress');
var myteam = require('./myteam');
var MyRestitution = require('./MyRestitution');
var mywallet = require('./mywallet');
var accountsettings = require('./accountsettings');
var CreateAccountOrder = require('./CreateAccountOrder');
var CreateShopOrder = require('./CreateShopOrder');
var ShoppingCart = require('./ShoppingCart');
var AccountOrderPayment = require('./AccountOrderPayment');
var ShopOrderPayment = require('./ShopOrderPayment');
var authcheck = require('../libs/authcheck');
var idCardAuthChecker = require('../libs/idCardAuthChecker');
var ShopOwnerChecker = require('../libs/ShopOwnerChecker');

var SellerOrderList = require('./SellerOrderList');
var SellerGoodsMgt = require('./SellerGoodsMgt');
var SellerGoodsLogistics = require('./SellerGoodsLogistics');
var SellerShop = require('./SellerShop');
var oauth = require('./oauth');

var options =
			[
				'/orderlist', '/MyCollection','/MyAddress', '/myteam',
				'/MyRestitution', '/mywallet',
				'/accountsettings', '/CreateAccountOrder', '/CreateShopOrder', '/ShoppingCart',
				'/AccountOrderPayment', '/ShopOrderPayment',
				'/SellerOrderList', '/SellerGoodsMgt', '/SellerGoodsLogistics',
				'/SellerShop'
			];

var idCardAuthOptions =
			[
				'/SellerOrderList', '/SellerGoodsMgt', '/SellerGoodsLogistics',
				'/SellerShop', '/mywallet/DrawbackWallet_Ali', '/mywallet/DrawbackWallet_Ali'
			];

var isShopOwnerOptions =
			[
				'/SellerOrderList', '/SellerGoodsMgt', '/SellerGoodsLogistics'
			];


router.use('/authenticate', authenticate);
router.use(options, authcheck);
router.use(idCardAuthOptions, idCardAuthChecker);
router.use(isShopOwnerOptions, ShopOwnerChecker);
router.use('/SMSCode', SMSCode);
router.use('/EmailCode', EmailCode);
router.use('/', home);
router.use('/shoplist', Shop);
router.use('/goodslist', Goods);
router.use('/orderlist', orderlist);
router.use('/MyCollection', MyCollection);
router.use('/MyAddress', MyAddress);
router.use('/myteam', myteam);
router.use('/MyRestitution', MyRestitution);
router.use('/mywallet', mywallet);
router.use('/accountsettings', accountsettings);
router.use('/CreateAccountOrder', CreateAccountOrder);
router.use('/CreateShopOrder', CreateShopOrder);
router.use('/ShoppingCart', ShoppingCart);
router.use('/AccountOrderPayment', AccountOrderPayment);
router.use('/ShopOrderPayment', ShopOrderPayment);

router.use('/SellerOrderList', SellerOrderList);
router.use('/SellerGoodsMgt', SellerGoodsMgt);
router.use('/SellerGoodsLogistics', SellerGoodsLogistics);
router.use('/SellerShop', SellerShop);
router.use('/oauth', oauth);

module.exports = router;
