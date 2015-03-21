require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSliceList = function(test) {
	compareResourceEOE(test, "slice/sliceList.e");
};

exports.testSliceRange = function(test) {
	compareResourceEOE(test, "slice/sliceRange.e");
};

exports.testSliceText = function(test) {
	compareResourceEOE(test, "slice/sliceText.e");
};

