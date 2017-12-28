var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var myteam = require('../models/myteam');

// subjection members
router.get('/', function(req, res, next) {
    var queryData = querystring.stringify({
        'profileNo': req.params.profileNo || req.session.theUser.profileNo,
        'subjectionUserName': req.query.subjectionUserName || '',
        'subjectionMobile': req.query.subjectionMobile || '',
        'subjectionCertificateNo': req.query.subjectionCertificateNo || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    myteam.membersList(queryData, function(ret) {
        console.log('----------membersList:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';
            res.locals.myteamRet = ret.result;

            var path = '/myteam';

            res.render('myteam/first-team', {
                theUser: req.session.theUser,
                members: res.locals.myteamRet.subjections,
                page: res.locals.myteamRet.page,
                path: path,
                active: { my_team: true }
            });
        } else {

        }
    });
});

// secondary subjection members
router.get('/:profileNo/subjections', function(req, res, next) {
    console.log('================secondary profileNo========', req.params.profileNo);
    var queryData = querystring.stringify({
        'profileNo': req.params.profileNo || '',
        'subjectionUserName': req.query.subjectionUserName || '',
        'subjectionMobile': req.query.subjectionMobile || '',
        'subjectionCertificateNo': req.query.subjectionCertificateNo || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    myteam.membersList(queryData, function(ret) {
        console.log('----------membersList:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';
            res.locals.myteamRet = ret.result;
            req.session.nextLeader = ret.result.account;

            var path = '/myteam/' + req.session.nextLeader.profileNo + '/subjections';

            res.render('myteam/secondary-team', {
                theUser: req.session.theUser,
                nextLeader: req.session.nextLeader,
                members: res.locals.myteamRet.subjections,
                page: res.locals.myteamRet.page,
                path: path,
                active: { my_team: true }
            });
        } else {

        }
    });
});

//third subjection members
router.get('/:profileNo/third-subjections', function(req, res, next) {
    var queryData = querystring.stringify({
        'profileNo': req.params.profileNo || '',
        'subjectionUserName': req.query.subjectionUserName || '',
        'subjectionMobile': req.query.subjectionMobile || '',
        'subjectionCertificateNo': req.query.subjectionCertificateNo || '',
        'pageNumber': req.query.pageNumber || '1',
        'pageSize': '10'
    });

    myteam.membersList(queryData, function(ret) {
        console.log('----------membersList:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.locals.layout = 'layouts/usercenter_layout';
            res.locals.myteamRet = ret.result;
            req.session.thirdLeader = ret.result.account;

            var path = '/myteam/' + req.session.thirdLeader.profileNo + '/third-subjections';

            res.render('myteam/third-team', {
                theUser: req.session.theUser,
                nextLeader: req.session.nextLeader,
                thirdLeader: req.session.thirdLeader,
                members: res.locals.myteamRet.subjections,
                page: res.locals.myteamRet.page,
                path: path,
                active: { my_team: true }
            });
        } else {

        }
    });
});


module.exports = router;