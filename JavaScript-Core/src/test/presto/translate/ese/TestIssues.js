require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testMinimal = function(test) {
	compareResourceESE(test, "issues/minimal.pec");
};

