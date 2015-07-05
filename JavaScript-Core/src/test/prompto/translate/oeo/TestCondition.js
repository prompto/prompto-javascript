// generated: 2015-07-05T23:01:02.016
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testComplexIf = function(test) {
	compareResourceOEO(test, "condition/complexIf.poc");
};

exports.testElseIf = function(test) {
	compareResourceOEO(test, "condition/elseIf.poc");
};

exports.testReturnIf = function(test) {
	compareResourceOEO(test, "condition/returnIf.poc");
};

exports.testSimpleIf = function(test) {
	compareResourceOEO(test, "condition/simpleIf.poc");
};

exports.testSwitch = function(test) {
	compareResourceOEO(test, "condition/switch.poc");
};

exports.testTernary = function(test) {
	compareResourceOEO(test, "condition/ternary.poc");
};

