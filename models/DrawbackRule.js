var httpreq = require('../libs/httpreq');
var DrawbackRuleOptions = require('../configs/serviceurl').DrawbackRuleOptions;

//drawback rule
function drawbackRule(callback) {
    var drawbackRuleOptions = {
        hostname: DrawbackRuleOptions.hostname,
        port: DrawbackRuleOptions.port,
        path: DrawbackRuleOptions.path.deductRate,
        method: 'GET'
    }

    httpreq.get(drawbackRuleOptions, callback);
}

var DrawbackRule = {
    drawbackRule: drawbackRule
}

module.exports = DrawbackRule;