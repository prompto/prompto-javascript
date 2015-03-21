require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testExpressionInjection = function(test) {
	compareResourceOPO(test, "injections/expressionInjection.o");
};

