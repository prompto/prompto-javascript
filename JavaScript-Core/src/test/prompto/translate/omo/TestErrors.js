require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testDivideByZero = function(test) {
	compareResourceOMO(test, "errors/divideByZero.poc");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceOMO(test, "errors/indexOutOfRange-listItem.poc");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceOMO(test, "errors/indexOutOfRange-sliceList.poc");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceOMO(test, "errors/indexOutOfRange-sliceRange.poc");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceOMO(test, "errors/indexOutOfRange-sliceText.poc");
};

exports.testNullDict = function(test) {
	compareResourceOMO(test, "errors/nullDict.poc");
};

exports.testNullItem = function(test) {
	compareResourceOMO(test, "errors/nullItem.poc");
};

exports.testNullKey = function(test) {
	compareResourceOMO(test, "errors/nullKey.poc");
};

exports.testNullMember = function(test) {
	compareResourceOMO(test, "errors/nullMember.poc");
};

exports.testNullMethod = function(test) {
	compareResourceOMO(test, "errors/nullMethod.poc");
};

exports.testUserException = function(test) {
	compareResourceOMO(test, "errors/userException.poc");
};

