var httpreq = require('../libs/httpreq');
var myTeamOptions = require('../configs/serviceurl').myTeamOptions;

//members list
function membersList(queryData, callback) {
	console.log('membersList :' + myTeamOptions.path.account_subjections + '?' + queryData);
	var membersListOptions = {
		hostname: myTeamOptions.hostname,
		port: myTeamOptions.port,
		path: myTeamOptions.path.account_subjections + '?' + queryData,
		method: 'GET'
	}

	httpreq.get(membersListOptions, callback);
}

//get member by username
function memberByUserName(queryData, callback) {
	var memberByUserNameOptions = {
		hostname: myTeamOptions.hostname,
		port: myTeamOptions.port,
		path: myTeamOptions.path.account_by_name + queryData,
		method: 'GET'
	}

	httpreq.get(memberByUserNameOptions, callback);
}

//get member by profileId(account)
function memberById(queryData, callback) {
	var memberByIdOptions = {
		hostname: myTeamOptions.hostname,
		port: myTeamOptions.port,
		path: myTeamOptions.path.account_by_id + queryData,
		method: 'GET'
	}

	httpreq.get(memberByIdOptions, callback);
}


var members = {
	membersList:membersList,
	memberByUserName:memberByUserName,
	memberById:memberById
}

module.exports = members;