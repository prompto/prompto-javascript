require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testSliceList = function(test) {
	compareResourceEME(test, "slice/sliceList.pec");
};

exports.testSliceRange = function(test) {
	compareResourceEME(test, "slice/sliceRange.pec");
};

exports.testSliceText = function(test) {
	compareResourceEME(test, "slice/sliceText.pec");
};

