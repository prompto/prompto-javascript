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

exports.testInterpretedSliceList = function(test) {
	checkInterpretedOutput(test, "slice/sliceList.pec");
};

exports.testTranspiledSliceList = function(test) {
	checkTranspiledOutput(test, "slice/sliceList.pec");
};

exports.testInterpretedSliceRange = function(test) {
	checkInterpretedOutput(test, "slice/sliceRange.pec");
};

exports.testTranspiledSliceRange = function(test) {
	checkTranspiledOutput(test, "slice/sliceRange.pec");
};

exports.testInterpretedSliceText = function(test) {
	checkInterpretedOutput(test, "slice/sliceText.pec");
};

exports.testTranspiledSliceText = function(test) {
	checkTranspiledOutput(test, "slice/sliceText.pec");
};

