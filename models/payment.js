var httpreq = require('../libs/httpreq');
var paymentOptions = require('../configs/serviceurl').paymentOptions;

//prepay
function prepay(postData, callback) {
    var prepayOptions = {
        hostname: paymentOptions.hostname,
        port: paymentOptions.port,
        path: paymentOptions.path.prepay,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, prepayOptions, callback);
}

//prerefund
function prerefund(postData, callback) {
    var prerefundOptions = {
        hostname: paymentOptions.hostname,
        port: paymentOptions.port,
        path: paymentOptions.path.prerefund,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, prerefundOptions, callback);
}

//refund
function refund(postData, callback) {

}

var payment = {
    prepay: prepay,
    prerefund: prerefund,
    refund: refund
}

module.exports = payment;