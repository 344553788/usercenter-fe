var httpreq = require('../libs/httpreq');
var AccountOrderOptions = require('../configs/serviceurl').AccountOrderOptions;

//query order amount
function orderAmount(queryData, callback) {
    var orderAmountOptions = {
        hostname: AccountOrderOptions.hostname,
        port: AccountOrderOptions.port,
        path: AccountOrderOptions.path.order_amount_query + '/' + queryData,
        method: 'GET'
    }

    httpreq.get(orderAmountOptions, callback);
}

var AccountOrder = {
    orderAmount: orderAmount
}

module.exports = AccountOrder;