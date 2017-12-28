var httpreq = require('../libs/httpreq');
var createShopOrderOptions = require('../configs/serviceurl').createShopOrderOptions;

function toOrder(queryData, callback) {
    var toOrderOptions = {
        hostname: createShopOrderOptions.hostname,
        port: createShopOrderOptions.port,
        path: createShopOrderOptions.path.to_order + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(toOrderOptions, callback);
}

function order(postData, callback) {
	var orderOptions = {
        hostname: createShopOrderOptions.hostname,
        port: createShopOrderOptions.port,
        path: createShopOrderOptions.path.order,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, orderOptions, callback);
}

var CreateShopOrder = {
    toOrder: toOrder,
    order: order
}

module.exports = CreateShopOrder;