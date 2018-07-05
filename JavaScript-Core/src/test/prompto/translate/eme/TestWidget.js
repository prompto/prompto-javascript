require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testMinimal = function(test) {
	compareResourceEME(test, "widget/minimal.pec");
};

exports.testNative = function(test) {
	compareResourceEME(test, "widget/native.pec");
};

