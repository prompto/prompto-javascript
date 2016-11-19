require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testExpressionInjection = function(test) {
	compareResourceOMO(test, "injections/expressionInjection.poc");
};

