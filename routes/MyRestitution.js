var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var MyRestitution = require('../models/MyRestitution');

router.get('/restitutionRecord', function(req, res, next) {
	var queryData = querystring.stringify({
       	'profileNo': req.session.theUser.profileNo,
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    MyRestitution.restitutionRecord(queryData, function(ret) {
        console.log('----------restitutionRecord:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('MyRestitution/restitutionRecord', {
                theUser: req.session.theUser,
                orders: ret.result.orders,
                page: ret.result.page,
                active: { my_restitution: true }
            });
        } else {

        }
    });
});

router.get('/restitutionRecordDetails', function(req, res, next) {
    var queryData = querystring.stringify({
        'cashNo': req.query.cashNo,
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    MyRestitution.restitutionDetail(queryData, function(ret) {
        console.log('----------restitutionRecordDetails:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';

            res.render('MyRestitution/restitutionRecordDetails', {
                theUser: req.session.theUser,
                records: ret.result.records,
                page: ret.result.page,
                active: { my_restitution: true },
                cashNo: '&cashNo=' + req.query.cashNo
            });
        } else {

        }
    });
});

module.exports = router;