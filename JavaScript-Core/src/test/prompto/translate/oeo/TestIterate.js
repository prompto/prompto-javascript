require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testForEachExpression = function(test) {
	compareResourceOEO(test, "iterate/forEachExpression.poc");
};

exports.testForEachIntegerList = function(test) {
	compareResourceOEO(test, "iterate/forEachIntegerList.poc");
};

