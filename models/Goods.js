var httpreq = require('../libs/httpreq');
var goodsOptions = require('../configs/serviceurl').goodsOptions;

//goods list
function goodsList(queryData, callback) {
    var goodsListOptions = {
        hostname: goodsOptions.hostname,
        port: goodsOptions.port,
        path: goodsOptions.path.goods_list + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(goodsListOptions, callback);
}

//goods details
function goodsDetail(queryData, callback) {
    var goodsDetailOptions = {
        hostname: goodsOptions.hostname,
        port: goodsOptions.port,
        path: goodsOptions.path.goods_detail + '/' + queryData,
        method: 'GET'
    }

    httpreq.get(goodsDetailOptions, callback);
}

//shop goods list
function shopGoodsList(queryData, callback) {
    var shopGoodsListOptions = {
        hostname: goodsOptions.hostname,
        port: goodsOptions.port,
        path: goodsOptions.path.shop_goods_list + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(shopGoodsListOptions, callback);
}

var Goods = {
    goodsList: goodsList,
    goodsDetail: goodsDetail,
    shopGoodsList: shopGoodsList
}

module.exports = Goods;