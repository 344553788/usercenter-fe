var httpreq = require('../libs/httpreq');
var mywalletOptions = require('../configs/serviceurl').mywalletOptions;

//moneySummary
function moneySummary(queryData, callback) {
    var moneySummaryOptions = {
        hostname: mywalletOptions.hostname,
        port: mywalletOptions.port,
        path: mywalletOptions.path.money_summary + '/' + queryData,
        method: 'GET'
    }
    httpreq.get(moneySummaryOptions, callback);
}

//moneyDetails
function moneyDetails(queryData, callback) {
    var moneyDetailsOptions = {
        hostname: mywalletOptions.hostname,
        port: mywalletOptions.port,
        path: mywalletOptions.path.money_details + '?' + queryData,
        method: 'GET'
    }
    httpreq.get(moneyDetailsOptions, callback);
}

//moneyDrawback
function moneyDrawback(postData, callback) {
    var moneyDrawbackOptions = {
        hostname: mywalletOptions.hostname,
        port: mywalletOptions.port,
        path: mywalletOptions.path.money_drawback,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, moneyDrawbackOptions, callback);
}

//toGold
function toGold(putData, callback) {
    var toGoldOptions = {
        hostname: mywalletOptions.hostname,
        port: mywalletOptions.port,
        path: mywalletOptions.path.toGold,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, toGoldOptions, callback);
}

var MyWallet = {
    moneySummary: moneySummary,
    moneyDetails: moneyDetails,
    moneyDrawback: moneyDrawback,
    toGold: toGold
}

module.exports = MyWallet;