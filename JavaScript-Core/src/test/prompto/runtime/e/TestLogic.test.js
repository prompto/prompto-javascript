require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAndBoolean = function(test) {
	checkInterpretedOutput(test, "logic/andBoolean.pec");
};

exports.testTranspiledAndBoolean = function(test) {
	checkTranspiledOutput(test, "logic/andBoolean.pec");
};

exports.testInterpretedNotBoolean = function(test) {
	checkInterpretedOutput(test, "logic/notBoolean.pec");
};

exports.testTranspiledNotBoolean = function(test) {
	checkTranspiledOutput(test, "logic/notBoolean.pec");
};

exports.testInterpretedOrBoolean = function(test) {
	checkInterpretedOutput(test, "logic/orBoolean.pec");
};

exports.testTranspiledOrBoolean = function(test) {
	checkTranspiledOutput(test, "logic/orBoolean.pec");
};

