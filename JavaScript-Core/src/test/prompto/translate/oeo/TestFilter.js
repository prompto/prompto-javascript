require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testFilterFromList = function(test) {
	compareResourceOEO(test, "filter/filterFromList.poc");
};

exports.testFilterFromSet = function(test) {
	compareResourceOEO(test, "filter/filterFromSet.poc");
};

