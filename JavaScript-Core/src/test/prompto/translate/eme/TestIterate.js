require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testForEachCategoryList = function(test) {
	compareResourceEME(test, "iterate/forEachCategoryList.pec");
};

exports.testForEachIntegerList = function(test) {
	compareResourceEME(test, "iterate/forEachIntegerList.pec");
};

