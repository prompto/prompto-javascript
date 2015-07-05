// generated: 2015-07-05T23:01:02.083
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testExpressionInjection = function(test) {
	compareResourceOSO(test, "injections/expressionInjection.poc");
};

