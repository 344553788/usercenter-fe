var httpreq = require('../libs/httpreq');
var homePageOptions = require('../configs/serviceurl').homePageOptions;

function homePageInfo(callback) {
    var homePageInfoOptions = {
        hostname: homePageOptions.hostname,
        port: homePageOptions.port,
        path: homePageOptions.path.home_page,
        method: 'GET'
    }

    httpreq.get(homePageInfoOptions, callback);
}

var HomePage = {
    homePageInfo: homePageInfo
}

module.exports = HomePage;