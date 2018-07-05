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

exports.testInterpretedAnyId = function(test) {
	checkInterpretedOutput(test, "native/anyId.pec");
};

exports.testTranspiledAnyId = function(test) {
	checkTranspiledOutput(test, "native/anyId.pec");
};

exports.testInterpretedAnyText = function(test) {
	checkInterpretedOutput(test, "native/anyText.pec");
};

exports.testTranspiledAnyText = function(test) {
	checkTranspiledOutput(test, "native/anyText.pec");
};

exports.testInterpretedAttribute = function(test) {
	checkInterpretedOutput(test, "native/attribute.pec");
};

exports.testTranspiledAttribute = function(test) {
	checkTranspiledOutput(test, "native/attribute.pec");
};

exports.testInterpretedCategory = function(test) {
	checkInterpretedOutput(test, "native/category.pec");
};

exports.testTranspiledCategory = function(test) {
	checkTranspiledOutput(test, "native/category.pec");
};

exports.testInterpretedCategoryReturn = function(test) {
	checkInterpretedOutput(test, "native/categoryReturn.pec");
};

exports.testTranspiledCategoryReturn = function(test) {
	checkTranspiledOutput(test, "native/categoryReturn.pec");
};

exports.testInterpretedMethod = function(test) {
	checkInterpretedOutput(test, "native/method.pec");
};

exports.testTranspiledMethod = function(test) {
	checkTranspiledOutput(test, "native/method.pec");
};

exports.testInterpretedNow = function(test) {
	checkInterpretedOutput(test, "native/now.pec");
};

exports.testTranspiledNow = function(test) {
	checkTranspiledOutput(test, "native/now.pec");
};

exports.testInterpretedPrinter = function(test) {
	checkInterpretedOutput(test, "native/printer.pec");
};

exports.testTranspiledPrinter = function(test) {
	checkTranspiledOutput(test, "native/printer.pec");
};

