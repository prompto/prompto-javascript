require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testFilterFromList = function(test) {
	compareResourceOMO(test, "filter/filterFromList.poc");
};

exports.testFilterFromSet = function(test) {
	compareResourceOMO(test, "filter/filterFromSet.poc");
};

