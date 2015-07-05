// generated: 2015-07-05T23:01:02.057
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testDivideByZero = function(test) {
	compareResourceOEO(test, "errors/divideByZero.poc");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceOEO(test, "errors/indexOutOfRange-listItem.poc");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceOEO(test, "errors/indexOutOfRange-sliceList.poc");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceOEO(test, "errors/indexOutOfRange-sliceRange.poc");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceOEO(test, "errors/indexOutOfRange-sliceText.poc");
};

exports.testNullDict = function(test) {
	compareResourceOEO(test, "errors/nullDict.poc");
};

exports.testNullItem = function(test) {
	compareResourceOEO(test, "errors/nullItem.poc");
};

exports.testNullKey = function(test) {
	compareResourceOEO(test, "errors/nullKey.poc");
};

exports.testNullMember = function(test) {
	compareResourceOEO(test, "errors/nullMember.poc");
};

exports.testNullMethod = function(test) {
	compareResourceOEO(test, "errors/nullMethod.poc");
};

exports.testUserException = function(test) {
	compareResourceOEO(test, "errors/userException.poc");
};

