// generated: 2015-07-05T23:01:02.080
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testExpressionInjection = function(test) {
	compareResourceEOE(test, "injections/expressionInjection.pec");
};

