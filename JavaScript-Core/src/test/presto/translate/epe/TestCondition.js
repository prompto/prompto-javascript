require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testComplexIf = function(test) {
	compareResourceEPE(test, "condition/complexIf.e");
};

exports.testElseIf = function(test) {
	compareResourceEPE(test, "condition/elseIf.e");
};

exports.testReturnIf = function(test) {
	compareResourceEPE(test, "condition/returnIf.e");
};

exports.testSimpleIf = function(test) {
	compareResourceEPE(test, "condition/simpleIf.e");
};

exports.testSwitch = function(test) {
	compareResourceEPE(test, "condition/switch.e");
};

exports.testTernary = function(test) {
	compareResourceEPE(test, "condition/ternary.e");
};

