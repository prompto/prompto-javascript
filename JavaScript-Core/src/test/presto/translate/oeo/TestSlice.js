require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSliceList = function(test) {
	compareResourceOEO(test, "slice/sliceList.o");
};

exports.testSliceRange = function(test) {
	compareResourceOEO(test, "slice/sliceRange.o");
};

exports.testSliceText = function(test) {
	compareResourceOEO(test, "slice/sliceText.o");
};

