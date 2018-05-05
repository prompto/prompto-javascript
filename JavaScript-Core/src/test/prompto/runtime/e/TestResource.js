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

exports.testInterpretedReadResource = function(test) {
	checkInterpretedOutput(test, "resource/readResource.pec");
};

exports.testTranspiledReadResource = function(test) {
	checkTranspiledOutput(test, "resource/readResource.pec");
};

exports.testInterpretedReadWithResource = function(test) {
	checkInterpretedOutput(test, "resource/readWithResource.pec");
};

exports.testTranspiledReadWithResource = function(test) {
	checkTranspiledOutput(test, "resource/readWithResource.pec");
};

exports.testInterpretedWriteResource = function(test) {
	checkInterpretedOutput(test, "resource/writeResource.pec");
};

exports.testTranspiledWriteResource = function(test) {
	checkTranspiledOutput(test, "resource/writeResource.pec");
};

exports.testInterpretedWriteWithResource = function(test) {
	checkInterpretedOutput(test, "resource/writeWithResource.pec");
};

exports.testTranspiledWriteWithResource = function(test) {
	checkTranspiledOutput(test, "resource/writeWithResource.pec");
};

