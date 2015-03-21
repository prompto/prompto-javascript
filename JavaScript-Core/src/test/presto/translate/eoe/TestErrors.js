require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDivideByZero = function(test) {
	compareResourceEOE(test, "errors/divideByZero.e");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceEOE(test, "errors/indexOutOfRange-listItem.e");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceEOE(test, "errors/indexOutOfRange-sliceList.e");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceEOE(test, "errors/indexOutOfRange-sliceRange.e");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceEOE(test, "errors/indexOutOfRange-sliceText.e");
};

exports.testNullDict = function(test) {
	compareResourceEOE(test, "errors/nullDict.e");
};

exports.testNullItem = function(test) {
	compareResourceEOE(test, "errors/nullItem.e");
};

exports.testNullKey = function(test) {
	compareResourceEOE(test, "errors/nullKey.e");
};

exports.testNullMember = function(test) {
	compareResourceEOE(test, "errors/nullMember.e");
};

exports.testNullMethod = function(test) {
	compareResourceEOE(test, "errors/nullMethod.e");
};

exports.testUserException = function(test) {
	compareResourceEOE(test, "errors/userException.e");
};

