require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testForEachCategoryList = function(test) {
	compareResourceESE(test, "iterate/forEachCategoryList.pec");
};

exports.testForEachIntegerList = function(test) {
	compareResourceESE(test, "iterate/forEachIntegerList.pec");
};

