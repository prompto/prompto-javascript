// generated: 2015-07-05T23:01:02.188
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testSliceList = function(test) {
	compareResourceESE(test, "slice/sliceList.pec");
};

exports.testSliceRange = function(test) {
	compareResourceESE(test, "slice/sliceRange.pec");
};

exports.testSliceText = function(test) {
	compareResourceESE(test, "slice/sliceText.pec");
};

