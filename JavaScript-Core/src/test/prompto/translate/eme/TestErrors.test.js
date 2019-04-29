require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testDivideByZero = function(test) {
	compareResourceEME(test, "errors/divideByZero.pec");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceEME(test, "errors/indexOutOfRange-listItem.pec");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceEME(test, "errors/indexOutOfRange-sliceList.pec");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceEME(test, "errors/indexOutOfRange-sliceRange.pec");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceEME(test, "errors/indexOutOfRange-sliceText.pec");
};

exports.testNullDict = function(test) {
	compareResourceEME(test, "errors/nullDict.pec");
};

exports.testNullItem = function(test) {
	compareResourceEME(test, "errors/nullItem.pec");
};

exports.testNullKey = function(test) {
	compareResourceEME(test, "errors/nullKey.pec");
};

exports.testNullMember = function(test) {
	compareResourceEME(test, "errors/nullMember.pec");
};

exports.testNullMethod = function(test) {
	compareResourceEME(test, "errors/nullMethod.pec");
};

exports.testUnexpected = function(test) {
	compareResourceEME(test, "errors/unexpected.pec");
};

exports.testUserException = function(test) {
	compareResourceEME(test, "errors/userException.pec");
};

