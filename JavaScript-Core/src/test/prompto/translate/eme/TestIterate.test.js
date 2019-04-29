require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testForEachCategoryList = function(test) {
	compareResourceEME(test, "iterate/forEachCategoryList.pec");
};

exports.testForEachExpression = function(test) {
	compareResourceEME(test, "iterate/forEachExpression.pec");
};

exports.testForEachIntegerList = function(test) {
	compareResourceEME(test, "iterate/forEachIntegerList.pec");
};

