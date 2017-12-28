var hosts = require('./hosts');
var servicehost = hosts.servicehost;
var businesshost = hosts.businesshost;

var paycfg = {
    //account level
    wechatpay: {
         "notifyURL": servicehost.protocol + "://" + servicehost.hostname + ":" + servicehost.port + "/account/level/orders/callback",
         "returnURL": businesshost.protocol + "://" + businesshost.hostname + ":" + businesshost.port,
         "ipAddress": businesshost.hostip
    },

    alipay: {
         "notifyURL": servicehost.protocol + "://" + servicehost.hostname + ":" + servicehost.port + "/account/level/orders/callback",
         "returnURL": businesshost.protocol + "://" + businesshost.hostname + ":" + businesshost.port,
         "ipAddress": businesshost.hostip
    },

    //shop order
    wechatpay_order: {
         "notifyURL": servicehost.protocol + "://" + servicehost.hostname + ":" + servicehost.port + "/shop/order/callback",
         "returnURL": businesshost.protocol + "://" + businesshost.hostname + ":" + businesshost.port,
         "ipAddress": businesshost.hostip
    },

    alipay_order: {
         "notifyURL": servicehost.protocol + "://" + servicehost.hostname + ":" + servicehost.port + "/shop/order/callback",
         "returnURL": businesshost.protocol + "://" + businesshost.hostname + ":" + businesshost.port,
         "ipAddress": businesshost.hostip
    },
}

module.exports = paycfg;