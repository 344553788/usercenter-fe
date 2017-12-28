var http = require('http');

function httpGet(options, callback) {
	var req = http.request(options, function(res) {
		var ret = '';

		res.on('data', function(data) {
			ret += data;
		});

		res.on('end', function() {
			callback(ret);
		});

	}).on('error', function(error) {
		console.log(error);
	});

	// write data to request body
	//req.write(queryData);
	req.end();
}

function httpPost(postData, options, callback) {
	var req = http.request(options, function(res) {
		var ret = '';

		res.on('data', function(data) {
			ret += data;
		});

		res.on('end', function() {
			callback(ret);
		});

	}).on('error', function(error) {
		console.log(error);
	});

	// write data to request body
	req.write(postData);
	req.end();
}

function httpPut(putData, options, callback) {
	var req = http.request(options, function(res) {
		var ret = '';

		res.on('data', function(data) {
			ret += data;
		});

		res.on('end', function() {
			callback(ret);
		});

	}).on('error', function(error) {
		console.log(error);
	});

	// write data to request body
	req.write(putData);
	req.end();
}

function httpDel(options, callback) {
	var req = http.request(options, function(res) {
		var ret = '';

		res.on('data', function(data) {
			ret += data;
		});

		res.on('end', function() {
			callback(ret);
		});

	}).on('error', function(error) {
		console.log(error);
	});

	req.end();
}

var httpreq = {
	get:httpGet,
	post:httpPost,
	put:httpPut,
	del:httpDel
}

module.exports = httpreq;