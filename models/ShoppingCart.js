var httpreq = require('../libs/httpreq');
var ShoppingCartOptions = require('../configs/serviceurl').ShoppingCartOptions;

//shopping cart list
function ShoppingCartList(queryData, callback) {
    var ShoppingCartListOptions = {
        hostname: ShoppingCartOptions.hostname,
        port: ShoppingCartOptions.port,
        path: ShoppingCartOptions.path.ShoppingCart_list + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(ShoppingCartListOptions, callback);
}

//shopping cart add
function addGoods(postData, callback) {
    var addGoodsOptions = {
        hostname: ShoppingCartOptions.hostname,
        port: ShoppingCartOptions.port,
        path: ShoppingCartOptions.path.ShoppingCart_add,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, addGoodsOptions, callback);
}

//shopping cart delete
function deleteGoods(deleteData, callback) {
    var deleteGoodsOptions = {
        hostname: ShoppingCartOptions.hostname,
        port: ShoppingCartOptions.port,
        path: ShoppingCartOptions.path.ShoppingCart_del + '/' + deleteData,
        method: 'DELETE'
    }

    httpreq.del(deleteGoodsOptions, callback);
}

var ShoppingCart = {
    ShoppingCartList: ShoppingCartList,
    addGoods: addGoods,
    deleteGoods: deleteGoods
}

module.exports = ShoppingCart;