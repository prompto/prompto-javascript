require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testDivideByZero = function(test) {
	compareResourceOPO(test, "errors/divideByZero.o");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceOPO(test, "errors/indexOutOfRange-listItem.o");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceOPO(test, "errors/indexOutOfRange-sliceList.o");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceOPO(test, "errors/indexOutOfRange-sliceRange.o");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceOPO(test, "errors/indexOutOfRange-sliceText.o");
};

exports.testNullDict = function(test) {
	compareResourceOPO(test, "errors/nullDict.o");
};

exports.testNullItem = function(test) {
	compareResourceOPO(test, "errors/nullItem.o");
};

exports.testNullKey = function(test) {
	compareResourceOPO(test, "errors/nullKey.o");
};

exports.testNullMember = function(test) {
	compareResourceOPO(test, "errors/nullMember.o");
};

exports.testNullMethod = function(test) {
	compareResourceOPO(test, "errors/nullMethod.o");
};

exports.testUserException = function(test) {
	compareResourceOPO(test, "errors/userException.o");
};

