require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testFetchFromList = function(test) {
	compareResourceEPE(test, "fetch/fetchFromList.e");
};

exports.testFetchFromSet = function(test) {
	compareResourceEPE(test, "fetch/fetchFromSet.e");
};

