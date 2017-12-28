var accountLevel = require('../models/accountLevel');

module.exports = function(req, res, next) {
   
    accountLevel.accountLevels(function(ret) {
        console.log('----------account level:' + ret);
        var ret = JSON.parse(ret);

        if (ret.errorCode === 0) {
            res.app.locals.accountLevels = ret.result;
            sortLevels(res.app.locals.accountLevels);
            next();
        } else {

        }
    });
    
}

function sortLevels(levels) {
    levels.sort(function(a, b) {
        return a.level - b.level;
    });
}