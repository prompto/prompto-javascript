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
	checkOutput(test, "condition/complexIf.pec");
};

exports.testEmbeddedIf = function(test) {
	checkOutput(test, "condition/embeddedIf.pec");
};

exports.testReturnIf = function(test) {
	checkOutput(test, "condition/returnIf.pec");
};

exports.testSimpleIf = function(test) {
	checkOutput(test, "condition/simpleIf.pec");
};

exports.testSwitch = function(test) {
	checkOutput(test, "condition/switch.pec");
};

exports.testTernary = function(test) {
	checkOutput(test, "condition/ternary.pec");
};

