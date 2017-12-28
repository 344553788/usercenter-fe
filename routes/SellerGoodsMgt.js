var express = require('express');
var router = express.Router();
var multer = require('multer');
var querystring = require('querystring');
var SellerGoodsMgt = require('../models/SellerGoodsMgt');
var createFolder = require('../libs/CreateFolder');
var uploadcfg = require('../configs/uploadcfg');

//var uploadFolder = 'public/uploads/goods';
var uploadFolder = uploadcfg.goods.home + uploadcfg.goods.folder;
createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
    },
    filename: function(req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage });

router.get('/api/publishGoodsStep1/goodsTopCategory', function(req, res, next) {
    var queryData = querystring.stringify({
        'parentId': req.query.goodsTopCategory || '',
        'pageNumber': 1,
        'pageSize': 50
    });

    console.log('queryData:', queryData);
    SellerGoodsMgt.goodsCategory(queryData, function(ret) {
        console.log('---------api------goodsCategory: ', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            //res.jsonp(ret.result.categorys);
            var categories = ret.result.categorys;
            var result = [];

            for (var index in categories) {
                var obj = {};
                obj[categories[index].id] = categories[index].title;
                result.push(obj);
            }

            res.jsonp(result);
        } else {

        }
    });
});

router.get('/api/publishGoodsStep1/goodsSecondCategory', function(req, res, next) {
    if (!req.query.goodsSecondCategory) {
        return
    }

    var queryData = querystring.stringify({
        'parentId': req.query.goodsSecondCategory,
        'pageNumber': 1,
        'pageSize': 50
    });

    console.log('queryData:', queryData);
    SellerGoodsMgt.goodsCategory(queryData, function(ret) {
        console.log('---------api------goodsCategory: ', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            //res.jsonp(ret.result.categorys);
            var categories = ret.result.categorys;
            var result = [];

            for (var index in categories) {
                var obj = {};
                obj[categories[index].id] = categories[index].title;
                result.push(obj);
            }

            res.jsonp(result);
        } else {

        }
    });
});

router.get('/publishGoodsStep1', function(req, res, next) {
    var queryData = querystring.stringify({
        'parentId': '',
        'pageNumber': 1,
        'pageSize': 50
    });

    SellerGoodsMgt.goodsCategory(queryData, function(ret) {
        console.log('---------------goodsCategory: ', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/sellercenter_layout';
            res.render('SellerGoodsMgt/PublishGoodsStep1', {
                goodsTopCategories: ret.result.categorys,
                theUser: req.session.theUser,
                active: { seller_publish_goods: true }
            });
        } else {

        }
    });
});

//get goodsSpec by category
router.post('/publishGoodsStep1', function(req, res, next) {
    var goodsTopCategory = req.body.goodsTopCategory;
    var goodsSecondCategory = req.body.goodsSecondCategory;
    var goodsThirdCategory = req.body.goodsThirdCategory;

    console.log('goodsTopCategory: ', goodsTopCategory);
    console.log('goodsSecondCategory:', goodsSecondCategory);
    console.log('goodsThirdCategory', goodsThirdCategory);

    var postData = goodsThirdCategory || goodsSecondCategory || goodsTopCategory;

    SellerGoodsMgt.goodsSpecByCategory(postData, function(ret) {
        console.log('---------------goodsSpec: ', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/sellercenter_layout';

            req.session.category4PublishGoods = ret.result.category;
            req.session.specs4PublishGoods = ret.result.specs;
            res.render('SellerGoodsMgt/PublishGoodsStep2', {
                category: req.session.category4PublishGoods,
                specs: req.session.specs4PublishGoods,
                theUser: req.session.theUser,
                active: { seller_publish_goods: true }
            });
        } else {
            res.redirect('/SellerGoodsMgt/publishGoodsStep1');
        }
    });
});

router.post('/publishGoodsStep2', upload.array('goodsPic', 6), function(req, res, next) {
    var postData = req.body;
    postData['shopId'] = req.session.theUser.shop.id;
    postData['cateId'] = req.session.category4PublishGoods.id;
    var files = req.files;

    for (var i = 0; i < files.length - 1; i++) {
        postData["images[" + i + "].imgUrl"] = uploadcfg.goods.folder + '/' + files[i].filename;
    }

    postData['coverPics'] = uploadcfg.goods.folder + '/' + files[files.length - 1].filename;

    postData = querystring.stringify(postData);
    console.log('------postData', postData);

    SellerGoodsMgt.addGoods(postData, function(ret) {
        console.log('---------------add Goods: ', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/sellercenter_layout';
            res.render('SellerGoodsMgt/PublishGoodsStep2', {
                theUser: req.session.theUser,
                category: req.session.category4PublishGoods,
                specs: req.session.specs4PublishGoods,
                success: true,
                active: { seller_publish_goods: true }
            });
        } else {
            res.locals.layout = 'layouts/sellercenter_layout';
            res.render('SellerGoodsMgt/PublishGoodsStep2', {
                theUser: req.session.theUser,
                category: req.session.category4PublishGoods,
                specs: req.session.specs4PublishGoods,
                failure: true,
                active: { seller_publish_goods: true }
            });
        }
    });
});

// shop SellerGoodsList
router.get('/SellerGoodsList/:isOn', function(req, res, next) {
    var queryData = querystring.stringify({
        'shopId': req.session.theUser.shop.id || '',
        'name': req.query.name || '',
        'cateId': req.query.cateId || '',
        'isOn': req.params.isOn,
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    SellerGoodsMgt.shopGoodsList(queryData, function(ret) {
        console.log('----------SellerGoodsList:' + ret);

        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/sellercenter_layout';
            var activeOne = req.params.isOn === 'true' ? { seller_onsale_goods: true } : { seller_offsale_goods: true };

            res.render('SellerGoodsMgt/SellerGoodsList', {
                theUser: req.session.theUser,
                products: ret.result.products,
                isOn: req.params.isOn,
                page: ret.result.page,
                active: activeOne
            });
        } else {

        }
    });
});

// shop SellerGoodsDetail
router.get('/SellerGoodsDetail/:isOn', function(req, res, next) {
    var queryData = querystring.stringify({
        'shopId': req.session.theUser.shop.id || '',
        'name': req.query.name || '',
        'cateId': req.query.cateId || '',
        'isOn': req.params.isOn,
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    SellerGoodsMgt.shopGoodsList(queryData, function(ret) {
        console.log('----------SellerGoodsList:' + ret);

        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/sellercenter_layout';
            var activeOne = req.params.isOn === 'true' ? { seller_onsale_goods: true } : { seller_offsale_goods: true };

            res.render('SellerGoodsMgt/SellerGoodsList', {
                theUser: req.session.theUser,
                products: ret.result.products,
                isOn: req.params.isOn,
                page: ret.result.page,
                active: activeOne
            });
        } else {

        }
    });
});

//edit_goods --- get
router.get('/editGoods/:productCode', function(req, res, next) {
    var queryData = req.params.productCode;

    SellerGoodsMgt.toEditGoods(queryData, function(ret) {
        console.log('----------SellerGoods toEditGoods:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            var onEditGoods = ret.result;
            var isOn = onEditGoods.isOn;
            var active = {};
            if (isOn) {
                active = { seller_onsale_goods: true };
            } else {
                active = { seller_offsale_goods: true };
            }

            var specs = onEditGoods.cateSpec.specs;
            var actived = onEditGoods.specs;

            actived.forEach(function(activedItem) {
                activedItem.specValue.forEach(function(specObjActived) {
                    //console.log('-----key----:', specObjActived.key);

                    specs.forEach(function(spec) {
                        spec.specValues.forEach(function(specValue) {
                            var specObj = specValue.specId + ':' + specValue.id;
                            //console.log('-----specObj:', specObj);

                            if (specObjActived.key === specObj) {
                                specValue['active'] = true;
                            }
                        });
                    });
                })
            });

            res.locals.layout = 'layouts/sellercenter_layout';

            //feedback
            var success = req.query.success || '';
            var failure = req.query.failure || '';

            if (success) {
                res.render('SellerGoodsMgt/SellerGoodsDetail', {
                    theUser: req.session.theUser,
                    onEditGoods: onEditGoods,
                    active: active,
                    success: true
                });
            }

            else if (failure) {
                res.render('SellerGoodsMgt/SellerGoodsDetail', {
                    theUser: req.session.theUser,
                    onEditGoods: onEditGoods,
                    active: active,
                    failure: true
                });
            } else {
                res.render('SellerGoodsMgt/SellerGoodsDetail', {
                    theUser: req.session.theUser,
                    onEditGoods: onEditGoods,
                    active: active
                });
            }

        } else {

        }
    });
});

var cpUpload = upload.fields([{ name: 'goodsPic0', maxCount: 1 },
    { name: 'goodsPic1', maxCount: 1 },
    { name: 'goodsPic2', maxCount: 1 },
    { name: 'goodsPic3', maxCount: 1 },
    { name: 'goodsPic4', maxCount: 1 },
    { name: 'goodsPic5', maxCount: 1 }
]);
//edit_goods --- post
router.post('/editGoods/:productCode', cpUpload, function(req, res, next) {
    var productCode = req.params.productCode;

    var postData = req.body;
    postData['productCode'] = productCode;

    var files = req.files;

    for (var i = 0; i < 5; i++) {

        if (files['goodsPic' + i]) {
            postData["images[" + i + "].imgUrl"] = uploadcfg.goods.folder + '/' + files['goodsPic' + i][0].filename;

        }

        console.log('-----test:', postData["images[" + i + "].imgUrl"]);
    }

    if (files['goodsPic5']) {
        postData['coverPics'] = uploadcfg.goods.folder + '/' + files['goodsPic5'][0].filename;
    }

    if(!req.body.isOn) {
        postData['isOn'] =  false;
    }

    if(!req.body.isLogistics) {
        postData['isLogistics'] = false;
    }
    
    postData = querystring.stringify(postData);
    console.log('------postData', postData);

    SellerGoodsMgt.editGoods(postData, function(ret) {
        console.log('------post----SellerGoods editGoods:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            var onEditGoods = ret.result;
            var isOn = onEditGoods.isOn;
            var active = {};
            if (isOn) {
                active = { seller_onsale_goods: true };
            } else {
                active = { seller_offsale_goods: true };
            }

            res.redirect('/SellerGoodsMgt/editGoods/' + productCode + '?success=true');

        } else {
            res.redirect('/SellerGoodsMgt/editGoods/' + productCode + '?failure=true');
        }
    });
});

//modify_goods_status
router.get('/modifyGoodsStatus/:productCode/:isOn/:newStatus', function(req, res, next) {
    var queryData = querystring.stringify({
        'productCode': req.params.productCode,
        'isOn': req.params.newStatus
    });

    console.log(queryData);

    SellerGoodsMgt.modifyGoodsStatus(queryData, function(ret) {
        console.log('----------SellerGoodsList:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.redirect('/SellerGoodsMgt/SellerGoodsList/' + req.params.isOn);
        } else {

        }
    });
});

// delete onsale goods
router.get('/deleteOnSaleGoods/:productCode', function(req, res, next) {
    var deleteData = req.params.productCode;

    SellerGoodsMgt.deleteGoods(deleteData, function(ret) {
        console.log('----------deleteOnSaleGoods:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.redirect('/SellerGoodsMgt/SellerGoodsList/true');
        } else {

        }
    });
});

// delete offsale goods
router.get('/deleteOffSaleGoods/:productCode', function(req, res, next) {
    var deleteData = req.params.productCode;

    SellerGoodsMgt.deleteGoods(deleteData, function(ret) {
        console.log('----------deleteOffSaleGoods:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.redirect('/SellerGoodsMgt/SellerGoodsList/false');
        } else {

        }
    });
});


module.exports = router;