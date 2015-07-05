// generated: 2015-07-05T23:01:02.085
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMinimal = function(test) {
	compareResourceEOE(test, "issues/minimal.pec");
};

