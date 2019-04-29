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

exports.testInterpretedCategoryEnum = function(test) {
	checkInterpretedOutput(test, "enums/categoryEnum.poc");
};

exports.testTranspiledCategoryEnum = function(test) {
	checkTranspiledOutput(test, "enums/categoryEnum.poc");
};

exports.testInterpretedIntegerEnum = function(test) {
	checkInterpretedOutput(test, "enums/integerEnum.poc");
};

exports.testTranspiledIntegerEnum = function(test) {
	checkTranspiledOutput(test, "enums/integerEnum.poc");
};

exports.testInterpretedTextEnum = function(test) {
	checkInterpretedOutput(test, "enums/textEnum.poc");
};

exports.testTranspiledTextEnum = function(test) {
	checkTranspiledOutput(test, "enums/textEnum.poc");
};

exports.testInterpretedTextEnumArg = function(test) {
	checkInterpretedOutput(test, "enums/textEnumArg.poc");
};

exports.testTranspiledTextEnumArg = function(test) {
	checkTranspiledOutput(test, "enums/textEnumArg.poc");
};

exports.testInterpretedTextEnumVar = function(test) {
	checkInterpretedOutput(test, "enums/textEnumVar.poc");
};

exports.testTranspiledTextEnumVar = function(test) {
	checkTranspiledOutput(test, "enums/textEnumVar.poc");
};

