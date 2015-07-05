// generated: 2015-07-05T23:01:02.191
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

