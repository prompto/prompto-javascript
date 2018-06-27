require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testMinimal = function(test) {
	compareResourceEME(test, "widget/minimal.pec");
};

