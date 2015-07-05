// generated: 2015-07-05T23:01:02.065
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testFetchFromList = function(test) {
	compareResourceOSO(test, "fetch/fetchFromList.poc");
};

exports.testFetchFromSet = function(test) {
	compareResourceOSO(test, "fetch/fetchFromSet.poc");
};

