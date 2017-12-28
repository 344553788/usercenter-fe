var httpreq = require('../libs/httpreq');
var sellerGoodsMgtOptions = require('../configs/serviceurl').sellerGoodsMgtOptions;

//goods category
function goodsCategory(queryData, callback) {
    console.log('goodsCategory :' + sellerGoodsMgtOptions.path.goods_category + '?' + queryData);
    var goodsCategoryOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.goods_category + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(goodsCategoryOptions, callback);
}

//get spec by category
function goodsSpecByCategory(queryData, callback) {
    var goodsSpecByCategoryOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.goods_spec + queryData,
        method: 'GET'
    }

    httpreq.get(goodsSpecByCategoryOptions, callback);
}

//add goods 
function addGoods(postData, callback) {
    var addGoodsOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.goods_add,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, addGoodsOptions, callback);
}

//to edit goods
function toEditGoods(queryData, callback) {
    var toEditGoodsOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.goods_to_edit + queryData,
        method: 'GET'
    }

    httpreq.get(toEditGoodsOptions, callback);
}

//edit goods
function editGoods(putData, callback) {
    var editGoodsOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.goods_edit,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, editGoodsOptions, callback); 
}

//delete goods
function deleteGoods(deleteData, callback) {
    var deleteGoodsOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.goods_delete + '/' + deleteData,
        method: 'DELETE'
    }

    httpreq.del(deleteGoodsOptions, callback);
}

//modify_goods_status
function modifyGoodsStatus(putData, callback) {
    var modifyGoodsStatusOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.modify_goods_status,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, modifyGoodsStatusOptions, callback); 
}

//goods list in shop
function shopGoodsList(queryData, callback) {
    var shopGoodsListOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.shop_goods_list + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(shopGoodsListOptions, callback);
}

//goods detail (not be used )
function shopGoodsDetail(queryData, callback) {
    var shopGoodsDetailOptions = {
        hostname: sellerGoodsMgtOptions.hostname,
        port: sellerGoodsMgtOptions.port,
        path: sellerGoodsMgtOptions.path.shop_goods_detail + '/' + queryData,
        method: 'GET'
    }

    httpreq.get(shopGoodsDetailOptions, callback);
}

var SellerGoodsMgt = {
    goodsCategory: goodsCategory,
    goodsSpecByCategory: goodsSpecByCategory,
    addGoods: addGoods,
    toEditGoods: toEditGoods,
    editGoods: editGoods,
    deleteGoods: deleteGoods,
    modifyGoodsStatus: modifyGoodsStatus,
    shopGoodsList: shopGoodsList,
    shopGoodsDetail: shopGoodsDetail
}

module.exports = SellerGoodsMgt;