require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSliceList = function(test) {
	compareResourceEOE(test, "slice/sliceList.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testSliceRange = function(test) {
	compareResourceEOE(test, "slice/sliceRange.pec");
};

exports.testSliceText = function(test) {
	compareResourceEOE(test, "slice/sliceText.pec");
};

