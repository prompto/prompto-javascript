require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testComplexIf = function(test) {
	compareResourceEOE(test, "condition/complexIf.e");
};

exports.testElseIf = function(test) {
	compareResourceEOE(test, "condition/elseIf.e");
};

exports.testReturnIf = function(test) {
	compareResourceEOE(test, "condition/returnIf.e");
};

exports.testSimpleIf = function(test) {
	compareResourceEOE(test, "condition/simpleIf.e");
};

exports.testSwitch = function(test) {
	compareResourceEOE(test, "condition/switch.e");
};

exports.testTernary = function(test) {
	compareResourceEOE(test, "condition/ternary.e");
};

