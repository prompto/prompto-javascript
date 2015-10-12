require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDivideByZero = function(test) {
	compareResourceEOE(test, "errors/divideByZero.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceEOE(test, "errors/indexOutOfRange-listItem.pec");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceEOE(test, "errors/indexOutOfRange-sliceList.pec");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceEOE(test, "errors/indexOutOfRange-sliceRange.pec");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceEOE(test, "errors/indexOutOfRange-sliceText.pec");
};

exports.testNullDict = function(test) {
	compareResourceEOE(test, "errors/nullDict.pec");
};

exports.testNullItem = function(test) {
	compareResourceEOE(test, "errors/nullItem.pec");
};

exports.testNullKey = function(test) {
	compareResourceEOE(test, "errors/nullKey.pec");
};

exports.testNullMember = function(test) {
	compareResourceEOE(test, "errors/nullMember.pec");
};

exports.testNullMethod = function(test) {
	compareResourceEOE(test, "errors/nullMethod.pec");
};

exports.testUnexpected = function(test) {
	compareResourceEOE(test, "errors/unexpected.pec");
};

exports.testUserException = function(test) {
	compareResourceEOE(test, "errors/userException.pec");
};

