var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var HomePage = require('../models/HomePage');
//homepage
router.get('/', function(req, res, next) {

    HomePage.homePageInfo(function(ret) {
        console.log('------homepage-----', ret);

        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
        
            res.locals.layout = false;
            res.render('home/homepage', {
                isHome: true,
                theUser: req.session.theUser,
                nav: ret.result.nav,
                carousels: ret.result.carousels,
                floors: ret.result.floors,
            });
        } else {
            // res.locals.layout = 'layouts/homepage_layout';
            // res.render('home/home', {
            //     theUser: req.session.theUser
            // });
        }
    });
});

module.exports = router;