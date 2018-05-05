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

exports.testInterpretedSubDate = function(test) {
	checkInterpretedOutput(test, "sub/subDate.pec");
};

exports.testTranspiledSubDate = function(test) {
	checkTranspiledOutput(test, "sub/subDate.pec");
};

exports.testInterpretedSubDateTime = function(test) {
	checkInterpretedOutput(test, "sub/subDateTime.pec");
};

exports.testTranspiledSubDateTime = function(test) {
	checkTranspiledOutput(test, "sub/subDateTime.pec");
};

exports.testInterpretedSubDecimal = function(test) {
	checkInterpretedOutput(test, "sub/subDecimal.pec");
};

exports.testTranspiledSubDecimal = function(test) {
	checkTranspiledOutput(test, "sub/subDecimal.pec");
};

exports.testInterpretedSubDecimalEnum = function(test) {
	checkInterpretedOutput(test, "sub/subDecimalEnum.pec");
};

exports.testTranspiledSubDecimalEnum = function(test) {
	checkTranspiledOutput(test, "sub/subDecimalEnum.pec");
};

exports.testInterpretedSubInteger = function(test) {
	checkInterpretedOutput(test, "sub/subInteger.pec");
};

exports.testTranspiledSubInteger = function(test) {
	checkTranspiledOutput(test, "sub/subInteger.pec");
};

exports.testInterpretedSubIntegerEnum = function(test) {
	checkInterpretedOutput(test, "sub/subIntegerEnum.pec");
};

exports.testTranspiledSubIntegerEnum = function(test) {
	checkTranspiledOutput(test, "sub/subIntegerEnum.pec");
};

exports.testInterpretedSubPeriod = function(test) {
	checkInterpretedOutput(test, "sub/subPeriod.pec");
};

exports.testTranspiledSubPeriod = function(test) {
	checkTranspiledOutput(test, "sub/subPeriod.pec");
};

exports.testInterpretedSubTime = function(test) {
	checkInterpretedOutput(test, "sub/subTime.pec");
};

exports.testTranspiledSubTime = function(test) {
	checkTranspiledOutput(test, "sub/subTime.pec");
};

