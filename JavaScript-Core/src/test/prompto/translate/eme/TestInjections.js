require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testExpressionInjection = function(test) {
	compareResourceEME(test, "injections/expressionInjection.pec");
};

