var httpreq = require('../libs/httpreq');
var CreateAccountOrderOptions = require('../configs/serviceurl').CreateAccountOrderOptions;

//generateOrder --register update account
function generateOrder(postData, callback) {
    var generateOrderOptions = {
        hostname: CreateAccountOrderOptions.hostname,
        port: CreateAccountOrderOptions.port,
        path: CreateAccountOrderOptions.path.order,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, generateOrderOptions, callback);
}

//generateOrder -- recharge
function generateRechargeOrder(postData, callback) {
    var generateRechargeOrderOptions = {
        hostname: CreateAccountOrderOptions.hostname,
        port: CreateAccountOrderOptions.port,
        path: CreateAccountOrderOptions.path.recharge_order,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, generateRechargeOrderOptions, callback);
}

var order = {
    generateOrder: generateOrder,
    generateRechargeOrder: generateRechargeOrder
}

module.exports = order;