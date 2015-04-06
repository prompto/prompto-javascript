require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testExpressionInjection = function(test) {
	compareResourceOSO(test, "injections/expressionInjection.poc");
};

