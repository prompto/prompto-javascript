// generated: 2015-07-05T23:01:02.058
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testDivideByZero = function(test) {
	compareResourceOSO(test, "errors/divideByZero.poc");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceOSO(test, "errors/indexOutOfRange-listItem.poc");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceOSO(test, "errors/indexOutOfRange-sliceList.poc");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceOSO(test, "errors/indexOutOfRange-sliceRange.poc");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceOSO(test, "errors/indexOutOfRange-sliceText.poc");
};

exports.testNullDict = function(test) {
	compareResourceOSO(test, "errors/nullDict.poc");
};

exports.testNullItem = function(test) {
	compareResourceOSO(test, "errors/nullItem.poc");
};

exports.testNullKey = function(test) {
	compareResourceOSO(test, "errors/nullKey.poc");
};

exports.testNullMember = function(test) {
	compareResourceOSO(test, "errors/nullMember.poc");
};

exports.testNullMethod = function(test) {
	compareResourceOSO(test, "errors/nullMethod.poc");
};

exports.testUserException = function(test) {
	compareResourceOSO(test, "errors/userException.poc");
};

