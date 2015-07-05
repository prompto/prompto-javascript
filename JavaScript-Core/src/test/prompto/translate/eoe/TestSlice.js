// generated: 2015-07-05T23:01:02.186
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSliceList = function(test) {
	compareResourceEOE(test, "slice/sliceList.pec");
};

exports.testSliceRange = function(test) {
	compareResourceEOE(test, "slice/sliceRange.pec");
};

exports.testSliceText = function(test) {
	compareResourceEOE(test, "slice/sliceText.pec");
};

