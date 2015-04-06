require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testFetchFromList = function(test) {
	compareResourceOSO(test, "fetch/fetchFromList.poc");
};

exports.testFetchFromSet = function(test) {
	compareResourceOSO(test, "fetch/fetchFromSet.poc");
};

