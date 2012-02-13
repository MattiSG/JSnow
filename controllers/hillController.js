var mocks = require('../models/hillMockup.js');

/**
*@returns	an array containing data for all hills
*/
exports.hills = function getHills() {
	return [
		mocks.auron,
		mocks.isola
	];
}

/**
*@return	data for the given hill, or undefined if no matching hill was found
*/
exports.hill = function getHill(whichOne) {
	return mocks[whichOne];
}
