require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testMinimal = function(test) {
	compareResourceEPE(test, "issues/minimal.e");
};

