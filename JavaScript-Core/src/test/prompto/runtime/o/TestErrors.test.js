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

exports.testInterpretedDivideByZero = function(test) {
	checkInterpretedOutput(test, "errors/divideByZero.poc");
};

exports.testTranspiledDivideByZero = function(test) {
	checkTranspiledOutput(test, "errors/divideByZero.poc");
};

exports.testInterpretedIndexOutOfRange_listItem = function(test) {
	checkInterpretedOutput(test, "errors/indexOutOfRange-listItem.poc");
};

exports.testTranspiledIndexOutOfRange_listItem = function(test) {
	checkTranspiledOutput(test, "errors/indexOutOfRange-listItem.poc");
};

exports.testInterpretedIndexOutOfRange_sliceList = function(test) {
	checkInterpretedOutput(test, "errors/indexOutOfRange-sliceList.poc");
};

exports.testTranspiledIndexOutOfRange_sliceList = function(test) {
	checkTranspiledOutput(test, "errors/indexOutOfRange-sliceList.poc");
};

exports.testInterpretedIndexOutOfRange_sliceRange = function(test) {
	checkInterpretedOutput(test, "errors/indexOutOfRange-sliceRange.poc");
};

exports.testTranspiledIndexOutOfRange_sliceRange = function(test) {
	checkTranspiledOutput(test, "errors/indexOutOfRange-sliceRange.poc");
};

exports.testInterpretedIndexOutOfRange_sliceText = function(test) {
	checkInterpretedOutput(test, "errors/indexOutOfRange-sliceText.poc");
};

exports.testTranspiledIndexOutOfRange_sliceText = function(test) {
	checkTranspiledOutput(test, "errors/indexOutOfRange-sliceText.poc");
};

exports.testInterpretedNullDict = function(test) {
	checkInterpretedOutput(test, "errors/nullDict.poc");
};

exports.testTranspiledNullDict = function(test) {
	checkTranspiledOutput(test, "errors/nullDict.poc");
};

exports.testInterpretedNullItem = function(test) {
	checkInterpretedOutput(test, "errors/nullItem.poc");
};

exports.testTranspiledNullItem = function(test) {
	checkTranspiledOutput(test, "errors/nullItem.poc");
};

exports.testInterpretedNullKey = function(test) {
	checkInterpretedOutput(test, "errors/nullKey.poc");
};

exports.testTranspiledNullKey = function(test) {
	checkTranspiledOutput(test, "errors/nullKey.poc");
};

exports.testInterpretedNullMember = function(test) {
	checkInterpretedOutput(test, "errors/nullMember.poc");
};

exports.testTranspiledNullMember = function(test) {
	checkTranspiledOutput(test, "errors/nullMember.poc");
};

exports.testInterpretedNullMethod = function(test) {
	checkInterpretedOutput(test, "errors/nullMethod.poc");
};

exports.testTranspiledNullMethod = function(test) {
	checkTranspiledOutput(test, "errors/nullMethod.poc");
};

exports.testInterpretedUserException = function(test) {
	checkInterpretedOutput(test, "errors/userException.poc");
};

exports.testTranspiledUserException = function(test) {
	checkTranspiledOutput(test, "errors/userException.poc");
};

