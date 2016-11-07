require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testFilterFromList = function(test) {
	compareResourceOSO(test, "filter/filterFromList.poc");
};

exports.testFilterFromSet = function(test) {
	compareResourceOSO(test, "filter/filterFromSet.poc");
};

