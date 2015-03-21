require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testExpressionInjection = function(test) {
	compareResourceEOE(test, "injections/expressionInjection.e");
};

