require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testComplexIf = function(test) {
	compareResourceOMO(test, "condition/complexIf.poc");
};

exports.testEmbeddedIf = function(test) {
	compareResourceOMO(test, "condition/embeddedIf.poc");
};

exports.testReturnIf = function(test) {
	compareResourceOMO(test, "condition/returnIf.poc");
};

exports.testSimpleIf = function(test) {
	compareResourceOMO(test, "condition/simpleIf.poc");
};

exports.testSwitch = function(test) {
	compareResourceOMO(test, "condition/switch.poc");
};

exports.testTernary = function(test) {
	compareResourceOMO(test, "condition/ternary.poc");
};

