require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testComplexIf = function(test) {
	compareResourceEOE(test, "condition/complexIf.pec");
};

exports.testEmbeddedIf = function(test) {
	compareResourceEOE(test, "condition/embeddedIf.pec");
};

exports.testReturnIf = function(test) {
	compareResourceEOE(test, "condition/returnIf.pec");
};

exports.testSimpleIf = function(test) {
	compareResourceEOE(test, "condition/simpleIf.pec");
};

exports.testSwitch = function(test) {
	compareResourceEOE(test, "condition/switch.pec");
};

exports.testTernary = function(test) {
	compareResourceEOE(test, "condition/ternary.pec");
};

