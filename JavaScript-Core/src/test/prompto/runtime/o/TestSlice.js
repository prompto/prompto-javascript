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

exports.testInterpretedSliceList = function(test) {
	checkInterpretedOutput(test, "slice/sliceList.poc");
};

exports.testTranspiledSliceList = function(test) {
	checkTranspiledOutput(test, "slice/sliceList.poc");
};

exports.testInterpretedSliceRange = function(test) {
	checkInterpretedOutput(test, "slice/sliceRange.poc");
};

exports.testTranspiledSliceRange = function(test) {
	checkTranspiledOutput(test, "slice/sliceRange.poc");
};

exports.testInterpretedSliceText = function(test) {
	checkInterpretedOutput(test, "slice/sliceText.poc");
};

exports.testTranspiledSliceText = function(test) {
	checkTranspiledOutput(test, "slice/sliceText.poc");
};

