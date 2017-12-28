function getLevelPrice(targetLevel) {
	switch(targetLevel) {
		case 0:
			return 0.03;
		case 1:
			return 0.02;
		case 2:
			return 0.01;
		default:
			break;
	}

}

function getUpgradePrice(currentLevel, targetLevel) {
	if(currentLevel > targetLevel) {
		switch(currentLevel - targetLevel) {
			case 1:
				return 0.01;
			case 2:
				return 0.02;
			default:
				break;
		}
	}
}


var utils = {
    getLevelPrice: getLevelPrice,
    getUpgradePrice: getUpgradePrice
}

module.exports = utils;