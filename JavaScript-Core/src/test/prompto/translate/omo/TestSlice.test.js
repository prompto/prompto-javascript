require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testSliceList = function(test) {
	compareResourceOMO(test, "slice/sliceList.poc");
};

exports.testSliceRange = function(test) {
	compareResourceOMO(test, "slice/sliceRange.poc");
};

exports.testSliceText = function(test) {
	compareResourceOMO(test, "slice/sliceText.poc");
};

