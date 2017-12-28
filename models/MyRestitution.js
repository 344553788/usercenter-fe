var httpreq = require('../libs/httpreq');
var MyRestitutionOptions = require('../configs/serviceurl').MyRestitutionOptions;

//restitution record
function restitutionRecord(queryData, callback) {
    var restitutionRecordOptions = {
        hostname: MyRestitutionOptions.hostname,
        port: MyRestitutionOptions.port,
        path: MyRestitutionOptions.path.restitutionRecord + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(restitutionRecordOptions, callback);
}

//restitution detail
function restitutionDetail(queryData, callback) {
    var restitutionDetailOptions = {
        hostname: MyRestitutionOptions.hostname,
        port: MyRestitutionOptions.port,
        path: MyRestitutionOptions.path.restitutionDetail + '?' + queryData,
        method: 'GET'
    }

    httpreq.get(restitutionDetailOptions, callback);
}

var MyRestitution = {
    restitutionRecord: restitutionRecord,
    restitutionDetail: restitutionDetail
}

module.exports = MyRestitution;