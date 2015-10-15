require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testExpressionInjection = function(test) {
	compareResourceESE(test, "injections/expressionInjection.pec");
};

