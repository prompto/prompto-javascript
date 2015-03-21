require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testComplexIf = function(test) {
	compareResourceOEO(test, "condition/complexIf.o");
};

exports.testElseIf = function(test) {
	compareResourceOEO(test, "condition/elseIf.o");
};

exports.testReturnIf = function(test) {
	compareResourceOEO(test, "condition/returnIf.o");
};

exports.testSimpleIf = function(test) {
	compareResourceOEO(test, "condition/simpleIf.o");
};

exports.testSwitch = function(test) {
	compareResourceOEO(test, "condition/switch.o");
};

exports.testTernary = function(test) {
	compareResourceOEO(test, "condition/ternary.o");
};

