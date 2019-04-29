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

exports.testInterpretedDivideByZero = function(test) {
	checkInterpretedOutput(test, "errors/divideByZero.pec");
};

exports.testTranspiledDivideByZero = function(test) {
	checkTranspiledOutput(test, "errors/divideByZero.pec");
};

exports.testInterpretedIndexOutOfRange_listItem = function(test) {
	checkInterpretedOutput(test, "errors/indexOutOfRange-listItem.pec");
};

exports.testTranspiledIndexOutOfRange_listItem = function(test) {
	checkTranspiledOutput(test, "errors/indexOutOfRange-listItem.pec");
};

exports.testInterpretedIndexOutOfRange_sliceList = function(test) {
	checkInterpretedOutput(test, "errors/indexOutOfRange-sliceList.pec");
};

exports.testTranspiledIndexOutOfRange_sliceList = function(test) {
	checkTranspiledOutput(test, "errors/indexOutOfRange-sliceList.pec");
};

exports.testInterpretedIndexOutOfRange_sliceRange = function(test) {
	checkInterpretedOutput(test, "errors/indexOutOfRange-sliceRange.pec");
};

exports.testTranspiledIndexOutOfRange_sliceRange = function(test) {
	checkTranspiledOutput(test, "errors/indexOutOfRange-sliceRange.pec");
};

exports.testInterpretedIndexOutOfRange_sliceText = function(test) {
	checkInterpretedOutput(test, "errors/indexOutOfRange-sliceText.pec");
};

exports.testTranspiledIndexOutOfRange_sliceText = function(test) {
	checkTranspiledOutput(test, "errors/indexOutOfRange-sliceText.pec");
};

exports.testInterpretedNullDict = function(test) {
	checkInterpretedOutput(test, "errors/nullDict.pec");
};

exports.testTranspiledNullDict = function(test) {
	checkTranspiledOutput(test, "errors/nullDict.pec");
};

exports.testInterpretedNullItem = function(test) {
	checkInterpretedOutput(test, "errors/nullItem.pec");
};

exports.testTranspiledNullItem = function(test) {
	checkTranspiledOutput(test, "errors/nullItem.pec");
};

exports.testInterpretedNullKey = function(test) {
	checkInterpretedOutput(test, "errors/nullKey.pec");
};

exports.testTranspiledNullKey = function(test) {
	checkTranspiledOutput(test, "errors/nullKey.pec");
};

exports.testInterpretedNullMember = function(test) {
	checkInterpretedOutput(test, "errors/nullMember.pec");
};

exports.testTranspiledNullMember = function(test) {
	checkTranspiledOutput(test, "errors/nullMember.pec");
};

exports.testInterpretedNullMethod = function(test) {
	checkInterpretedOutput(test, "errors/nullMethod.pec");
};

exports.testTranspiledNullMethod = function(test) {
	checkTranspiledOutput(test, "errors/nullMethod.pec");
};

exports.testInterpretedUserException = function(test) {
	checkInterpretedOutput(test, "errors/userException.pec");
};

exports.testTranspiledUserException = function(test) {
	checkTranspiledOutput(test, "errors/userException.pec");
};

