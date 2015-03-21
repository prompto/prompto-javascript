require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testExpressionInjection = function(test) {
	compareResourceOEO(test, "injections/expressionInjection.o");
};

