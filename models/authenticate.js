var httpreq = require('../libs/httpreq');
var authenticateOptions = require('../configs/serviceurl').authenticateOptions;

//register
function register(postData, callback) {
	var registerOptions = {
		hostname: authenticateOptions.hostname,
		port: authenticateOptions.port,
		path: authenticateOptions.path.register,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
  		}
	}

	httpreq.post(postData, registerOptions, callback);
}

//login
function login(postData, callback) {
	var loginOptions = {
		hostname: authenticateOptions.hostname,
		port: authenticateOptions.port,
		path: authenticateOptions.path.login,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
  		}
	}

	httpreq.post(postData, loginOptions, callback);
}


var authenticate = {
	register:register,
	login:login
}

module.exports = authenticate;
