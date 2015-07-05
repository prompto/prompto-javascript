// generated: 2015-07-05T23:01:02.062
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testFetchFromList = function(test) {
	compareResourceESE(test, "fetch/fetchFromList.pec");
};

exports.testFetchFromSet = function(test) {
	compareResourceESE(test, "fetch/fetchFromSet.pec");
};

