require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testForEachExpression = function(test) {
	compareResourceOMO(test, "iterate/forEachExpression.poc");
};

exports.testForEachIntegerList = function(test) {
	compareResourceOMO(test, "iterate/forEachIntegerList.poc");
};

