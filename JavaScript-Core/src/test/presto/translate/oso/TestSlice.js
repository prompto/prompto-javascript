require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testSliceList = function(test) {
	compareResourceOSO(test, "slice/sliceList.poc");
};

exports.testSliceRange = function(test) {
	compareResourceOSO(test, "slice/sliceRange.poc");
};

exports.testSliceText = function(test) {
	compareResourceOSO(test, "slice/sliceText.poc");
};

