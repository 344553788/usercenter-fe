var httpreq = require('../libs/httpreq');
var smscodeOptions = require('../configs/serviceurl').smscodeOptions;

//sms verifycode
function obtain_smscode(postData, callback) {
	var smsVerifyCode = {
		hostname: smscodeOptions.hostname,
		port: smscodeOptions.port,
		path: smscodeOptions.path.obtain_smscode,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
  		}
	}

	httpreq.post(postData, smsVerifyCode, callback);
}

var SMSCode = {
	obtain_smscode: obtain_smscode
}

module.exports = SMSCode;