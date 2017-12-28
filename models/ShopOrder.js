var httpreq = require('../libs/httpreq');
var shopOrderOptions = require('../configs/serviceurl').shopOrderOptions;

//orderlist
function orderlist(queryData, callback) {
    var orderListOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_list + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(orderListOptions, callback);
}

//orderdetail
function orderdetail(queryData, callback) {
    var orderDetailOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_detail + '/' + queryData,
        method: 'GET'
    }

    httpreq.get(orderDetailOptions, callback);
}

//query order amount
function orderAmount(queryData, callback) {
    var orderAmountOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_amount_query + '/' + queryData,
        method: 'GET'
    }

    httpreq.get(orderAmountOptions, callback);
}


//cancel order
function cancelOrder(putData, callback) {
    var cancelOrderOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_cancel_request,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, cancelOrderOptions, callback);
}

//shipping order
function shippingOrder(putData, callback) {
    var shippingOrderOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_shipping,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, shippingOrderOptions, callback);
}

//orderDone
function orderDone(putData, callback) {
    var orderDoneOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_done + '/' + putData,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, orderDoneOptions, callback);
}

//orderAgent
function orderAgent(postData, callback) {
    var orderAgentOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_agent,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, orderAgentOptions, callback);
}


//nabiPay
function nabiPay(postData, callback) {
    var orderAgentOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_agent_payment,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }
    httpreq.post(postData, orderAgentOptions, callback);
}

//agent order list
function agentOrderlist(queryData, callback) {
    var agentOrderlistOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_agent_query + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(agentOrderlistOptions, callback);
}

//agent order cancel
function cancelAgentOrder(deleteData, callback) {
    var cancelAgentOrderOptions = {
        hostname: shopOrderOptions.hostname,
        port: shopOrderOptions.port,
        path: shopOrderOptions.path.order_agent_cancel + '/' + deleteData,
        method: 'DELETE'
    }

    httpreq.del(cancelAgentOrderOptions, callback);
}

var shopOrder = {
    orderlist: orderlist,
    orderdetail: orderdetail,
    orderAmount: orderAmount,
    cancelOrder: cancelOrder,
    shippingOrder: shippingOrder,
    orderDone: orderDone,
    orderAgent: orderAgent,
    agentOrderlist: agentOrderlist,
    cancelAgentOrder: cancelAgentOrder,
    nabiPay: nabiPay
}

module.exports = shopOrder;
