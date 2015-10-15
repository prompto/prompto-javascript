require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMinimal = function(test) {
	compareResourceEOE(test, "issues/minimal.pec");
};

