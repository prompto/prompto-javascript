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

exports.testInterpretedFilterFromCursor = function(test) {
	checkInterpretedOutput(test, "filter/filterFromCursor.pec");
};

exports.testTranspiledFilterFromCursor = function(test) {
	checkTranspiledOutput(test, "filter/filterFromCursor.pec");
};

exports.testInterpretedFilterFromList = function(test) {
	checkInterpretedOutput(test, "filter/filterFromList.pec");
};

exports.testTranspiledFilterFromList = function(test) {
	checkTranspiledOutput(test, "filter/filterFromList.pec");
};

exports.testInterpretedFilterFromSet = function(test) {
	checkInterpretedOutput(test, "filter/filterFromSet.pec");
};

exports.testTranspiledFilterFromSet = function(test) {
	checkTranspiledOutput(test, "filter/filterFromSet.pec");
};

