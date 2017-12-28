var publicHelpers = require('./public-helpers');

function helpers (hbs) {
	publicHelpers.compare(hbs);
	publicHelpers.pagination(hbs);
	publicHelpers.compareLessThan(hbs);
	publicHelpers.compareMoreThan(hbs);
	publicHelpers.addOne(hbs);
	publicHelpers.compoundValue(hbs);
	publicHelpers.paginationPlus(hbs);
}

module.exports = helpers;