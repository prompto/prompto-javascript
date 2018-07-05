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

exports.testInterpretedMinimal = function(test) {
	checkInterpretedOutput(test, "widget/minimal.pec");
};

exports.testTranspiledMinimal = function(test) {
	checkTranspiledOutput(test, "widget/minimal.pec");
};

exports.testInterpretedNative = function(test) {
	checkInterpretedOutput(test, "widget/native.pec");
};

exports.testTranspiledNative = function(test) {
	checkTranspiledOutput(test, "widget/native.pec");
};

