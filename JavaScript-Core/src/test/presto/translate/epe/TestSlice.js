require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testSliceList = function(test) {
	compareResourceEPE(test, "slice/sliceList.e");
};

exports.testSliceRange = function(test) {
	compareResourceEPE(test, "slice/sliceRange.e");
};

exports.testSliceText = function(test) {
	compareResourceEPE(test, "slice/sliceText.e");
};

