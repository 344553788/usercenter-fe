var httpreq = require('../libs/httpreq');
var myCollectionOptions = require('../configs/serviceurl').myCollectionOptions;

//shop collection
function shopCollection(callback) {
    var shopCollectionOptions = {
        hostname: myCollectionOptions.hostname,
        port: myCollectionOptions.port,
        path: myCollectionOptions.path.shop_collection,
        method: 'GET'
    }

    httpreq.get(shopCollectionOptions, callback);
}

//goods collection
function goodsCollection(callback) {
    var goodsCollectionOptions = {
        hostname: myCollectionOptions.hostname,
        port: myCollectionOptions.port,
        path: myCollectionOptions.path.goods_collection,
        method: 'GET'
    }

    httpreq.get(goodsCollectionOptions, callback);
}

var MyCollection = {
    shopCollection: shopCollection,
    goodsCollection: goodsCollection
}

module.exports = MyCollection;