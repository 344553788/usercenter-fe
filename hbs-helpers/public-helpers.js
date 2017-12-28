function compare(hbs) {
    return hbs.registerHelper("compare", function(v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
}

function compareLessThan(hbs) {
    return hbs.registerHelper("compareLessThan", function(v1, v2, options) {
        if (v1 < v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
}

function compareMoreThan(hbs) {
    return hbs.registerHelper("compareMoreThan", function(v1, v2, options) {
        if (v1 > v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
}

function addOne(hbs) {
    return hbs.registerHelper("addOne", function(index) {
        return index + 1;
    });
}

function compoundValue(hbs) {
    return hbs.registerHelper("compoundValue", function(value, separator, separator2) {
        var content = "";

        var pieceArr = value.split(separator);
        for(var i = 0; i < pieceArr.length; i++) {
            
            var key = pieceArr[i].split(separator2)[2];
            var value = pieceArr[i].split(separator2)[3];
            content += '<span>' + key + ':&nbsp;' + value + '</span>&nbsp;&nbsp;&nbsp;&nbsp';
        }
        
        return new hbs.handlebars.SafeString(content);
    });
}

function pagination(hbs) {
    return hbs.registerHelper("pagination", function(pages, current, path) {
        var content = "";

        // for(var i = 1; i < pages+1; i++) {
        // 	if(i == current) {
        // 		content += "<li class='active'><a href='/sysadmin/admins?pageNumber=" + i + "'>" + i + "</a></li>"; 
        // 	}else {
        // 		content += "<li><a href='/sysadmin/admins?pageNumber=" + i + "'>" + i + "</a></li>"; 
        // 	}
        // }

        for (var i = 1; i < pages + 1; i++) {
            if (i == current) {
                content += "<li class='active'><a href='" + path + "?pageNumber=" + i + "'>" + i + "</a></li>";
            } else {
                content += "<li><a href='" + path + "?pageNumber=" + i + "'>" + i + "</a></li>";
            }
        }

        return new hbs.handlebars.SafeString(content);
    });
}

function paginationPlus(hbs) {
    return hbs.registerHelper("paginationPlus", function(pages, current, pre, val, end) {
        var content = "";

        for (var i = 1; i < pages + 1; i++) {
            if (i == current) {
                content += "<li class='active'><a href='" + pre + val + "?pageNumber=" + i + end +"'>" + i + "</a></li>";
            } else {
                content += "<li><a href='" + pre + val + "?pageNumber=" + i + end +"'>" + i + "</a></li>";
            }
        }

        return new hbs.handlebars.SafeString(content);
    });
}

var helpers = {
    compare: compare,
    compareLessThan: compareLessThan,
    compareMoreThan: compareMoreThan,
    addOne: addOne,
    compoundValue: compoundValue,
    pagination: pagination,
    paginationPlus: paginationPlus
}

module.exports = helpers;