var httpreq = require('../libs/httpreq');
var accountSettingsOptions = require('../configs/serviceurl').accountSettingsOptions;

function userBasicInfo(queryData, callback) {
    console.log('userBasicInfo :' + accountSettingsOptions.path.user_basicInfo + queryData);
    var userBasicInfoOptions = {
        hostname: accountSettingsOptions.hostname,
        port: accountSettingsOptions.port,
        path: accountSettingsOptions.path.user_basicInfo + queryData,
        method: 'GET'
    }

    httpreq.get(userBasicInfoOptions, callback);
}

function userBasicInfoUpdate(putData, callback) {
    var userBasicInfoOptions = {
        hostname: accountSettingsOptions.hostname,
        port: accountSettingsOptions.port,
        path: accountSettingsOptions.path.user_basicInfo,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, userBasicInfoOptions, callback);
}

function passwordUpdate(putData, callback) {
    var passwordUpdateOptions = {
        hostname: accountSettingsOptions.hostname,
        port: accountSettingsOptions.port,
        path: accountSettingsOptions.path.password_update,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, passwordUpdateOptions, callback);
}

function mobileUpdate(putData, callback) {
    var mobileUpdateOptions = {
        hostname: accountSettingsOptions.hostname,
        port: accountSettingsOptions.port,
        path: accountSettingsOptions.path.mobile_update,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, mobileUpdateOptions, callback);
}

function emailUpdate(putData, callback) {
    var mobileUpdateOptions = {
        hostname: accountSettingsOptions.hostname,
        port: accountSettingsOptions.port,
        path: accountSettingsOptions.path.email_update,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(putData)
        }
    }

    httpreq.put(putData, emailUpdateOptions, callback);
}

function applyPIDAuth(postData, callback) {
    var applyPIDAuthOptions = {
        hostname: accountSettingsOptions.hostname,
        port: accountSettingsOptions.port,
        path: accountSettingsOptions.path.pid_auth_apply,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, applyPIDAuthOptions, callback);
}

function paymentTypeBinding(postData, callback) {
    var paymentTypeBindingOptions = {
        hostname: accountSettingsOptions.hostname,
        port: accountSettingsOptions.port,
        path: accountSettingsOptions.path.payment_type_binding,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    httpreq.post(postData, paymentTypeBindingOptions, callback);
}

var authenticate = {
    userBasicInfo: userBasicInfo,
    userBasicInfoUpdate: userBasicInfoUpdate,
    passwordUpdate: passwordUpdate,
    mobileUpdate: mobileUpdate,
    emailUpdate: emailUpdate,
    applyPIDAuth: applyPIDAuth,
    paymentTypeBinding: paymentTypeBinding
}

module.exports = authenticate;