require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testDivideByZero = function(test) {
	compareResourceOEO(test, "errors/divideByZero.o");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceOEO(test, "errors/indexOutOfRange-listItem.o");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceOEO(test, "errors/indexOutOfRange-sliceList.o");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceOEO(test, "errors/indexOutOfRange-sliceRange.o");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceOEO(test, "errors/indexOutOfRange-sliceText.o");
};

exports.testNullDict = function(test) {
	compareResourceOEO(test, "errors/nullDict.o");
};

exports.testNullItem = function(test) {
	compareResourceOEO(test, "errors/nullItem.o");
};

exports.testNullKey = function(test) {
	compareResourceOEO(test, "errors/nullKey.o");
};

exports.testNullMember = function(test) {
	compareResourceOEO(test, "errors/nullMember.o");
};

exports.testNullMethod = function(test) {
	compareResourceOEO(test, "errors/nullMethod.o");
};

exports.testUserException = function(test) {
	compareResourceOEO(test, "errors/userException.o");
};

