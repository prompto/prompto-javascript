require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testComplexIf = function(test) {
	compareResourceEME(test, "condition/complexIf.pec");
};

exports.testEmbeddedIf = function(test) {
	compareResourceEME(test, "condition/embeddedIf.pec");
};

exports.testReturnIf = function(test) {
	compareResourceEME(test, "condition/returnIf.pec");
};

exports.testSimpleIf = function(test) {
	compareResourceEME(test, "condition/simpleIf.pec");
};

exports.testSwitch = function(test) {
	compareResourceEME(test, "condition/switch.pec");
};

exports.testTernary = function(test) {
	compareResourceEME(test, "condition/ternary.pec");
};

