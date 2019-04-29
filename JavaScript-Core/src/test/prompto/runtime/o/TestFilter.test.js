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

exports.testInterpretedFilterFromList = function(test) {
	checkInterpretedOutput(test, "filter/filterFromList.poc");
};

exports.testTranspiledFilterFromList = function(test) {
	checkTranspiledOutput(test, "filter/filterFromList.poc");
};

exports.testInterpretedFilterFromSet = function(test) {
	checkInterpretedOutput(test, "filter/filterFromSet.poc");
};

exports.testTranspiledFilterFromSet = function(test) {
	checkTranspiledOutput(test, "filter/filterFromSet.poc");
};

