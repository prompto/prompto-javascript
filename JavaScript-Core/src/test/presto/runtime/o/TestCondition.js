require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testComplexIf = function(test) {
	checkOutput(test, "condition/complexIf.o");
};

exports.testElseIf = function(test) {
	checkOutput(test, "condition/elseIf.o");
};

exports.testReturnIf = function(test) {
	checkOutput(test, "condition/returnIf.o");
};

exports.testSimpleIf = function(test) {
	checkOutput(test, "condition/simpleIf.o");
};

exports.testSwitch = function(test) {
	checkOutput(test, "condition/switch.o");
};

exports.testTernary = function(test) {
	checkOutput(test, "condition/ternary.o");
};

