require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testForEachCategoryList = function(test) {
	compareResourceEOE(test, "iterate/forEachCategoryList.pec");
};

exports.testForEachIntegerList = function(test) {
	compareResourceEOE(test, "iterate/forEachIntegerList.pec");
};

