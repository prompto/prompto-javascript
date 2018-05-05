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

exports.testInterpretedCategoryEnum = function(test) {
	checkInterpretedOutput(test, "enums/categoryEnum.pec");
};

exports.testTranspiledCategoryEnum = function(test) {
	checkTranspiledOutput(test, "enums/categoryEnum.pec");
};

exports.testInterpretedIntegerEnum = function(test) {
	checkInterpretedOutput(test, "enums/integerEnum.pec");
};

exports.testTranspiledIntegerEnum = function(test) {
	checkTranspiledOutput(test, "enums/integerEnum.pec");
};

exports.testInterpretedStoreCategoryEnum = function(test) {
	checkInterpretedOutput(test, "enums/storeCategoryEnum.pec");
};

exports.testTranspiledStoreCategoryEnum = function(test) {
	checkTranspiledOutput(test, "enums/storeCategoryEnum.pec");
};

exports.testInterpretedStoreIntegerEnum = function(test) {
	checkInterpretedOutput(test, "enums/storeIntegerEnum.pec");
};

exports.testTranspiledStoreIntegerEnum = function(test) {
	checkTranspiledOutput(test, "enums/storeIntegerEnum.pec");
};

exports.testInterpretedStoreTextEnum = function(test) {
	checkInterpretedOutput(test, "enums/storeTextEnum.pec");
};

exports.testTranspiledStoreTextEnum = function(test) {
	checkTranspiledOutput(test, "enums/storeTextEnum.pec");
};

exports.testInterpretedTextEnum = function(test) {
	checkInterpretedOutput(test, "enums/textEnum.pec");
};

exports.testTranspiledTextEnum = function(test) {
	checkTranspiledOutput(test, "enums/textEnum.pec");
};

exports.testInterpretedTextEnumArg = function(test) {
	checkInterpretedOutput(test, "enums/textEnumArg.pec");
};

exports.testTranspiledTextEnumArg = function(test) {
	checkTranspiledOutput(test, "enums/textEnumArg.pec");
};

exports.testInterpretedTextEnumVar = function(test) {
	checkInterpretedOutput(test, "enums/textEnumVar.pec");
};

exports.testTranspiledTextEnumVar = function(test) {
	checkTranspiledOutput(test, "enums/textEnumVar.pec");
};

