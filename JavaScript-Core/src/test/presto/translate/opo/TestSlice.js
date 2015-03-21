require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testSliceList = function(test) {
	compareResourceOPO(test, "slice/sliceList.o");
};

exports.testSliceRange = function(test) {
	compareResourceOPO(test, "slice/sliceRange.o");
};

exports.testSliceText = function(test) {
	compareResourceOPO(test, "slice/sliceText.o");
};

