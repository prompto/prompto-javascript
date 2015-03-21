require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testComplexIf = function(test) {
	checkOutput(test, "condition/complexIf.e");
};

exports.testElseIf = function(test) {
	checkOutput(test, "condition/elseIf.e");
};

exports.testReturnIf = function(test) {
	checkOutput(test, "condition/returnIf.e");
};

exports.testSimpleIf = function(test) {
	checkOutput(test, "condition/simpleIf.e");
};

exports.testSwitch = function(test) {
	checkOutput(test, "condition/switch.e");
};

exports.testTernary = function(test) {
	checkOutput(test, "condition/ternary.e");
};

