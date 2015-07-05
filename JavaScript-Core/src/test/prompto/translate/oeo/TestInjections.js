// generated: 2015-07-05T23:01:02.082
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testExpressionInjection = function(test) {
	compareResourceOEO(test, "injections/expressionInjection.poc");
};

