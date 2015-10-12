require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSliceList = function(test) {
	compareResourceOEO(test, "slice/sliceList.poc");
};

exports.testSliceRange = function(test) {
	compareResourceOEO(test, "slice/sliceRange.poc");
};

exports.testSliceText = function(test) {
	compareResourceOEO(test, "slice/sliceText.poc");
};

