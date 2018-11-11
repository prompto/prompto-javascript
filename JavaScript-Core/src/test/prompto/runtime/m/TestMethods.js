require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedTextAsync = function(test) {
	checkInterpretedOutput(test, "methods/textAsync.pmc");
};

exports.testTranspiledTextAsync = function(test) {
	checkTranspiledOutput(test, "methods/textAsync.pmc");
};

exports.testInterpretedVoidAsync = function(test) {
	checkInterpretedOutput(test, "methods/voidAsync.pmc");
};

exports.testTranspiledVoidAsync = function(test) {
	checkTranspiledOutput(test, "methods/voidAsync.pmc");
};

