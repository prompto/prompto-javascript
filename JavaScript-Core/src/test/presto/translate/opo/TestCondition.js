require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testComplexIf = function(test) {
	compareResourceOPO(test, "condition/complexIf.o");
};

exports.testElseIf = function(test) {
	compareResourceOPO(test, "condition/elseIf.o");
};

exports.testReturnIf = function(test) {
	compareResourceOPO(test, "condition/returnIf.o");
};

exports.testSimpleIf = function(test) {
	compareResourceOPO(test, "condition/simpleIf.o");
};

exports.testSwitch = function(test) {
	compareResourceOPO(test, "condition/switch.o");
};

exports.testTernary = function(test) {
	compareResourceOPO(test, "condition/ternary.o");
};

