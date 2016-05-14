require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testComplexIf = function(test) {
	compareResourceOSO(test, "condition/complexIf.poc");
};

exports.testEmbeddedIf = function(test) {
	compareResourceOSO(test, "condition/embeddedIf.poc");
};

exports.testReturnIf = function(test) {
	compareResourceOSO(test, "condition/returnIf.poc");
};

exports.testSimpleIf = function(test) {
	compareResourceOSO(test, "condition/simpleIf.poc");
};

exports.testSwitch = function(test) {
	compareResourceOSO(test, "condition/switch.poc");
};

exports.testTernary = function(test) {
	compareResourceOSO(test, "condition/ternary.poc");
};

