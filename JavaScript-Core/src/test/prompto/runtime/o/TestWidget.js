require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedMinimal = function(test) {
	checkInterpretedOutput(test, "widget/minimal.poc");
};

exports.testTranspiledMinimal = function(test) {
	checkTranspiledOutput(test, "widget/minimal.poc");
};

exports.testInterpretedNative = function(test) {
	checkInterpretedOutput(test, "widget/native.poc");
};

exports.testTranspiledNative = function(test) {
	checkTranspiledOutput(test, "widget/native.poc");
};

