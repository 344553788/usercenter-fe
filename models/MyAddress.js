var httpreq = require('../libs/httpreq');
var myAddressOptions = require('../configs/serviceurl').myAddressOptions;

function addressList(queryData, callback) {
    var addressListOptions = {
        hostname: myAddressOptions.hostname,
        port: myAddressOptions.port,
        path: myAddressOptions.path.address_list + '/' + queryData,
        method: 'GET'
    }

    httpreq.get(addressListOptions, callback);
}

function addressNew(postData, callback) {
	var addressNewOptions = {
        hostname: myAddressOptions.hostname,
        port: myAddressOptions.port,
        path: myAddressOptions.path.address_new,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, addressNewOptions, callback);
}

function addressUpdate(putData, callback) {
	var addressUpdateOptions = {
        hostname: myAddressOptions.hostname,
        port: myAddressOptions.port,
        path: myAddressOptions.path.address_update,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, addressUpdateOptions, callback);
}

function addressDelete(deleteData, callback) {
	var addressDeleteOptions = {
        hostname: myAddressOptions.hostname,
        port: myAddressOptions.port,
        path: myAddressOptions.path.address_delete + '/' + deleteData,
        method: 'DELETE'
    }

    httpreq.del(addressDeleteOptions, callback);
}


function addressDetail(queryData, callback) {
	var addressDetailOptions = {
        hostname: myAddressOptions.hostname,
        port: myAddressOptions.port,
        path: myAddressOptions.path.address_detail + '/' + queryData,
        method: 'GET'
    }

    httpreq.get(addressDetailOptions, callback);
}

var MyAddress = {
    addressList: addressList,
    addressNew: addressNew,
    addressUpdate: addressUpdate,
    addressDelete: addressDelete,
    addressDetail: addressDetail
}

module.exports = MyAddress;