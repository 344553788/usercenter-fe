var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var multer = require('multer');

var accountsettings = require('../models/accountsettings');
var createFolder = require('../libs/CreateFolder');

var uploadcfg = require('../configs/uploadcfg');

//var uploadFolder = 'public/uploads/pids';
var uploadFolder = uploadcfg.pids.home + uploadcfg.pids.folder;
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

//basic info  get
router.get('/basic-info', function(req, res, next) {
    var queryData = req.session.theUser.profileNo;

    accountsettings.userBasicInfo(queryData, function(ret) {
        console.log('----------userBasicInfo:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.locals.userBasicInfo = ret.result;

            res.render('account-settings/basic-info', {
                theUser: req.session.theUser,
                userBasicInfo: res.locals.userBasicInfo,
                active: { basic_info: true }
            });
        } else {

        }
    });
});

//basic info post
router.post('/basic-info', function(req, res, next) {
    var putData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'nickName': req.body.nickName
    });

    accountsettings.userBasicInfoUpdate(putData, function(ret) {
        console.log('----------userBasicInfo:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.locals.userBasicInfo = ret.result;

            res.render('account-settings/basic-info', {
                theUser: req.session.theUser,
                userBasicInfo: res.locals.userBasicInfo,
                success: true,
                active: { basic_info: true }
            });
        } else {

        }
    });
});

//security info account-upgrade  get
router.get('/security-info/account-upgrade', function(req, res, next) {
    var queryData = req.session.theUser.profileNo;

    accountsettings.userBasicInfo(queryData, function(ret) {
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.locals.userBasicInfo = ret.result;

            res.render('account-settings/account-upgrade', {
                theUser: req.session.theUser,
                active: { account_upgrade: true }
            });
        } else {

        }
    });
});

//security info password-update  get
router.get('/security-info/password-update', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';
    res.render('account-settings/password-update', {
        theUser: req.session.theUser,
        active: { password_update: true }
    });
});

router.post('/security-info/password-update', function(req, res, next) {
    var putData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'oldPassWord': req.body.oldPassWord,
        'passWord': req.body.passWord,
        'type': 1
    });

    accountsettings.passwordUpdate(putData, function(ret) {
        console.log('----------passwordUpdate:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('account-settings/password-update', {
                theUser: req.session.theUser,
                result: ret.result,
                success: true,
                active: { password_update: true }
            });
        } else {

        }
    });

});

//security info mobile-update get
router.get('/security-info/mobile-update', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';
    res.render('account-settings/mobile-update', {
        theUser: req.session.theUser,
        active: { mobile_update: true }
    });
});

//security info mobile-update post
router.post('/security-info/mobile-update', function(req, res, next) {
    var putData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'mobile': req.body.mobile,
        'verifyCode': req.body.verifyCode
    });

    accountsettings.mobileUpdate(putData, function(ret) {
        console.log('----------mobileUpdate:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('account-settings/mobile-update', {
                theUser: req.session.theUser,
                result: ret.result,
                success: true,
                active: { mobile_update: true }
            });
        } else {

        }
    });
});

//security info email-update  get 
router.get('/security-info/email-update', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';
    res.render('account-settings/email-update', {
        theUser: req.session.theUser,
        active: { email_update: true }
    });
});

//security info email-update  post 
router.post('/security-info/email-update', function(req, res, next) {
    var putData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'email': req.body.email,
        'verifyCode': req.body.verifyCode
    });

    accountsettings.emailUpdate(putData, function(ret) {
        console.log('----------mobileUpdate:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('account-settings/email-update', {
                theUser: req.session.theUser,
                result: ret.result,
                success: true,
                active: { email_update: true }
            });
        } else {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('account-settings/email-update', {
                theUser: req.session.theUser,
                result: ret.result,
                failure: true,
                active: { email_update: true }
            });
        }
    });
});

//security info personalId-update
router.get('/security-info/personalId-update', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';

    var idcardAuthed = false;

    if (req.session.theUser.idcardAuth === 1) {
        idcardAuthed = true;
    }

    if (!idcardAuthed) {
        res.render('account-settings/personalId-update', {
            theUser: req.session.theUser,
            active: { personalId_update: true }
        });
    } else {
        res.render('account-settings/personalId-authed', {
            theUser: req.session.theUser,
            active: { personalId_update: true }
        });
    }

});

//apply pid auth
router.post('/security-info/personalId-update', upload.array('pids', 3), function(req, res, next) {
     if (req.session.theUser.idcardAuth === 1) {
        res.redirect('/security-info/personalId-authed');
        return;
    }

    var files = req.files;
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'name': req.body.name,
        'certificateType': 1,
        'certificateNo': req.body.certificateNo,
        'frontUrl': uploadcfg.pids.folder + '/' + files[0].filename,
        'reverseUrl': uploadcfg.pids.folder + '/' + files[1].filename,
        'handUrl': uploadcfg.pids.folder + '/' + files[2].filename
    });

    accountsettings.applyPIDAuth(postData, function(ret) {
        console.log('----------applyPIDAuth:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';
            res.render('account-settings/personalId-update', {
                theUser: req.session.theUser,
                success: true,
                active: { personalId_update: true }
            });
        } else {
            res.locals.layout = 'layouts/usercenter_layout';
            res.render('account-settings/personalId-update', {
                theUser: req.session.theUser,
                failure: true,
                active: { personalId_update: true }
            });
        }
    });
});

//account payment binding
router.get('/payment-binding-ali', function(req, res, next) {
    var paymentAccount = req.session.theUser.userBank.alipay.bankCode || '';

    res.locals.layout = 'layouts/usercenter_layout';
    res.render('account-settings/account-binding-payment-ali', {
        theUser: req.session.theUser,
        paymentAccount: paymentAccount,
        active: { account_binding_payment: true }
    });
});

router.get('/payment-binding-wechat', function(req, res, next) {
    var paymentAccount = req.session.theUser.userBank.wepay.bankCode || '';

    res.locals.layout = 'layouts/usercenter_layout';
    res.render('account-settings/account-binding-payment-wechat', {
        theUser: req.session.theUser,
        paymentAccount: paymentAccount,
        active: { account_binding_payment: true }
    });
});

router.get('/payment-binding-alimodify', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';
    res.render('account-settings/account-binding-payment-alimodify', {
        theUser: req.session.theUser,
        active: { account_binding_payment: true }
    });
});

router.get('/payment-binding-wechatmodify', function(req, res, next) {
    res.locals.layout = 'layouts/usercenter_layout';
    res.render('account-settings/account-binding-payment-wechatmodify', {
        theUser: req.session.theUser,
        active: { account_binding_payment: true }
    });
});

//alipay binding confirm
router.post('/alipay-binding-confirm', function(req, res, next) {
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'bankCode': req.body.bankCode,
        'type': req.body.type,
        'verifyCode': req.body.verifyCode
    });

    accountsettings.paymentTypeBinding(postData, function(ret) {
        console.log('------------paymentTypeBinding:', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            req.session.theUser.userBank.alipay = ret.result;

            res.locals.layout = 'layouts/usercenter_layout';
            res.render('account-settings/account-binding-payment-alimodify', {
                theUser: req.session.theUser,
                active: { account_binding_payment: true },
                success: true
            });
        } else {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('account-settings/account-binding-payment-alimodify', {
                theUser: req.session.theUser,
                active: { account_binding_payment: true },
                failure: true
            });
        }
    });
});

//wechat pay binding confirm
router.post('/wechat-binding-confirm', function(req, res, next) {
    var postData = querystring.stringify({
        'profileNo': req.session.theUser.profileNo,
        'bankCode': req.body.bankCode,
        'type': req.body.type,
        'verifyCode': req.body.verifyCode
    });

    accountsettings.paymentTypeBinding(postData, function(ret) {
        console.log('------------paymentTypeBinding:', ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            req.session.theUser.userBank.wepay = ret.result;

            res.locals.layout = 'layouts/usercenter_layout';
            res.render('account-settings/account-binding-payment-wechatmodify', {
                theUser: req.session.theUser,
                active: { account_binding_payment: true },
                success: true
            });
        } else {
            res.locals.layout = 'layouts/usercenter_layout';
            res.render('account-settings/account-binding-payment-wechatmodify', {
                theUser: req.session.theUser,
                active: { account_binding_payment: true },
                failure: true
            });
        }
    });
});

module.exports = router;