require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testExpressionInjection = function(test) {
	compareResourceEOE(test, "injections/expressionInjection.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

