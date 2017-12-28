var httpreq = require('../libs/httpreq');
var shopOptions = require('../configs/serviceurl').shopOptions;

//shop list
function shopList(queryData, callback) {
    var shopListOptions = {
        hostname: shopOptions.hostname,
        port: shopOptions.port,
        path: shopOptions.path.shop_list + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(shopListOptions, callback);
}

//shop detail
function shopDetail(queryData, callback) {
    var shopDetailOptions = {
        hostname: shopOptions.hostname,
        port: shopOptions.port,
        path: shopOptions.path.shop_detail + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(shopDetailOptions, callback);
}


var Shop = {
	shopList: shopList,
	shopDetail: shopDetail
}

module.exports = Shop;