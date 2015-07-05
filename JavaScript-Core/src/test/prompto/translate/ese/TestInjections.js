// generated: 2015-07-05T23:01:02.081
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testExpressionInjection = function(test) {
	compareResourceESE(test, "injections/expressionInjection.pec");
};

