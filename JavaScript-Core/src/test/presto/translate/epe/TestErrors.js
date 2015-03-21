require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testDivideByZero = function(test) {
	compareResourceEPE(test, "errors/divideByZero.e");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceEPE(test, "errors/indexOutOfRange-listItem.e");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceEPE(test, "errors/indexOutOfRange-sliceList.e");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceEPE(test, "errors/indexOutOfRange-sliceRange.e");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceEPE(test, "errors/indexOutOfRange-sliceText.e");
};

exports.testNullDict = function(test) {
	compareResourceEPE(test, "errors/nullDict.e");
};

exports.testNullItem = function(test) {
	compareResourceEPE(test, "errors/nullItem.e");
};

exports.testNullKey = function(test) {
	compareResourceEPE(test, "errors/nullKey.e");
};

exports.testNullMember = function(test) {
	compareResourceEPE(test, "errors/nullMember.e");
};

exports.testNullMethod = function(test) {
	compareResourceEPE(test, "errors/nullMethod.e");
};

exports.testUserException = function(test) {
	compareResourceEPE(test, "errors/userException.e");
};

