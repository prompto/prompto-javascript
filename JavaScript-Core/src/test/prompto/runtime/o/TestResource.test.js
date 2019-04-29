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

exports.testInterpretedReadResource = function(test) {
	checkInterpretedOutput(test, "resource/readResource.poc");
};

exports.testTranspiledReadResource = function(test) {
	checkTranspiledOutput(test, "resource/readResource.poc");
};

exports.testInterpretedReadWithResource = function(test) {
	checkInterpretedOutput(test, "resource/readWithResource.poc");
};

exports.testTranspiledReadWithResource = function(test) {
	checkTranspiledOutput(test, "resource/readWithResource.poc");
};

exports.testInterpretedWriteResource = function(test) {
	checkInterpretedOutput(test, "resource/writeResource.poc");
};

exports.testTranspiledWriteResource = function(test) {
	checkTranspiledOutput(test, "resource/writeResource.poc");
};

exports.testInterpretedWriteWithResource = function(test) {
	checkInterpretedOutput(test, "resource/writeWithResource.poc");
};

exports.testTranspiledWriteWithResource = function(test) {
	checkTranspiledOutput(test, "resource/writeWithResource.poc");
};

