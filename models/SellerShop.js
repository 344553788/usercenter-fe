var httpreq = require('../libs/httpreq');
var sellerShopOptions = require('../configs/serviceurl').sellerShopOptions;

//seller shop basic settings
function getSellerShopBasicSettings(queryData, callback) {
    var sellerShopBasicSettingsOptions = {
        hostname: sellerShopOptions.hostname,
        port: sellerShopOptions.port,
        path: sellerShopOptions.path.basic_settings + '/' + queryData,
        method: 'GET'
    }

    httpreq.get(sellerShopBasicSettingsOptions, callback);
}

function updateSellerShopBasicSettings(putData, callback) {
    var sellerShopBasicSettingsOptions = {
        hostname: sellerShopOptions.hostname,
        port: sellerShopOptions.port,
        path: sellerShopOptions.path.basic_settings,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, sellerShopBasicSettingsOptions, callback);
}

var SellerShop = {
    getSellerShopBasicSettings: getSellerShopBasicSettings,
    updateSellerShopBasicSettings: updateSellerShopBasicSettings
}

module.exports = SellerShop;