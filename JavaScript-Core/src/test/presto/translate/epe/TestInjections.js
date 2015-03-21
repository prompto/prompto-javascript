require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testExpressionInjection = function(test) {
	compareResourceEPE(test, "injections/expressionInjection.e");
};

