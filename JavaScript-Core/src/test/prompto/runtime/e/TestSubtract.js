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
	checkInterpretedOutput(test, "subtract/subDate.pec");
};

exports.testTranspiledSubDate = function(test) {
	checkTranspiledOutput(test, "subtract/subDate.pec");
};

exports.testInterpretedSubDateTime = function(test) {
	checkInterpretedOutput(test, "subtract/subDateTime.pec");
};

exports.testTranspiledSubDateTime = function(test) {
	checkTranspiledOutput(test, "subtract/subDateTime.pec");
};

exports.testInterpretedSubDecimal = function(test) {
	checkInterpretedOutput(test, "subtract/subDecimal.pec");
};

exports.testTranspiledSubDecimal = function(test) {
	checkTranspiledOutput(test, "subtract/subDecimal.pec");
};

exports.testInterpretedSubDecimalEnum = function(test) {
	checkInterpretedOutput(test, "subtract/subDecimalEnum.pec");
};

exports.testTranspiledSubDecimalEnum = function(test) {
	checkTranspiledOutput(test, "subtract/subDecimalEnum.pec");
};

exports.testInterpretedSubInteger = function(test) {
	checkInterpretedOutput(test, "subtract/subInteger.pec");
};

exports.testTranspiledSubInteger = function(test) {
	checkTranspiledOutput(test, "subtract/subInteger.pec");
};

exports.testInterpretedSubIntegerEnum = function(test) {
	checkInterpretedOutput(test, "subtract/subIntegerEnum.pec");
};

exports.testTranspiledSubIntegerEnum = function(test) {
	checkTranspiledOutput(test, "subtract/subIntegerEnum.pec");
};

exports.testInterpretedSubList = function(test) {
	checkInterpretedOutput(test, "subtract/subList.pec");
};

exports.testTranspiledSubList = function(test) {
	checkTranspiledOutput(test, "subtract/subList.pec");
};

exports.testInterpretedSubPeriod = function(test) {
	checkInterpretedOutput(test, "subtract/subPeriod.pec");
};

exports.testTranspiledSubPeriod = function(test) {
	checkTranspiledOutput(test, "subtract/subPeriod.pec");
};

exports.testInterpretedSubSet = function(test) {
	checkInterpretedOutput(test, "subtract/subSet.pec");
};

exports.testTranspiledSubSet = function(test) {
	checkTranspiledOutput(test, "subtract/subSet.pec");
};

exports.testInterpretedSubTime = function(test) {
	checkInterpretedOutput(test, "subtract/subTime.pec");
};

exports.testTranspiledSubTime = function(test) {
	checkTranspiledOutput(test, "subtract/subTime.pec");
};

