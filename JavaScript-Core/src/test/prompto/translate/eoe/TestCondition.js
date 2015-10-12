require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testComplexIf = function(test) {
	compareResourceEOE(test, "condition/complexIf.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testElseIf = function(test) {
	compareResourceEOE(test, "condition/elseIf.pec");
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

