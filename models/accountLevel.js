var httpreq = require('../libs/httpreq');
var accountLevelOptions = require('../configs/serviceurl').accountLevelOptions;

//account levels
function accountLevels(callback) {
    var accountLevelsOptions = {
        hostname: accountLevelOptions.hostname,
        port: accountLevelOptions.port,
        path: accountLevelOptions.path.account_levels,
        method: 'GET'
    }

    httpreq.get(accountLevelsOptions, callback);
}

var accountLevel = {
    accountLevels: accountLevels
}

module.exports = accountLevel;