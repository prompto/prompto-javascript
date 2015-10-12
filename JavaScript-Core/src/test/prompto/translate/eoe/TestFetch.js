require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testFetchFromList = function(test) {
	compareResourceEOE(test, "fetch/fetchFromList.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testFetchFromSet = function(test) {
	compareResourceEOE(test, "fetch/fetchFromSet.pec");
};

