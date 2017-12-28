var httpreq = require('../libs/httpreq');
var emailCodeOptions = require('../configs/serviceurl').emailCodeOptions;

//email verifycode
function obtain_emailcode(postData, callback) {
	var emailVerifyCode = {
		hostname: emailCodeOptions.hostname,
		port: emailCodeOptions.port,
		path: emailCodeOptions.path.obtain_emailcode,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
  		}
	}

	httpreq.post(postData, emailVerifyCode, callback);
}

var EmailCode = {
	obtain_emailcode: obtain_emailcode
}

module.exports = EmailCode;