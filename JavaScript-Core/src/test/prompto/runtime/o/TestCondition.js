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
	checkOutput(test, "condition/complexIf.poc");
};

exports.testElseIf = function(test) {
	checkOutput(test, "condition/elseIf.poc");
};

exports.testReturnIf = function(test) {
	checkOutput(test, "condition/returnIf.poc");
};

exports.testSimpleIf = function(test) {
	checkOutput(test, "condition/simpleIf.poc");
};

exports.testSwitch = function(test) {
	checkOutput(test, "condition/switch.poc");
};

exports.testTernary = function(test) {
	checkOutput(test, "condition/ternary.poc");
};

