require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testComplexIf = function(test) {
	compareResourceESE(test, "condition/complexIf.pec");
};

exports.testReturnIf = function(test) {
	compareResourceESE(test, "condition/returnIf.pec");
};

exports.testSimpleIf = function(test) {
	compareResourceESE(test, "condition/simpleIf.pec");
};

exports.testSwitch = function(test) {
	compareResourceESE(test, "condition/switch.pec");
};

exports.testTernary = function(test) {
	compareResourceESE(test, "condition/ternary.pec");
};

