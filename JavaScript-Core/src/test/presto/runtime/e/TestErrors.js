require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testDivideByZero = function(test) {
	checkOutput(test, "errors/divideByZero.e");
};

exports.testIndexOutOfRange_listItem = function(test) {
	checkOutput(test, "errors/indexOutOfRange-listItem.e");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceList.e");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceRange.e");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceText.e");
};

exports.testNullDict = function(test) {
	checkOutput(test, "errors/nullDict.e");
};

exports.testNullItem = function(test) {
	checkOutput(test, "errors/nullItem.e");
};

exports.testNullKey = function(test) {
	checkOutput(test, "errors/nullKey.e");
};

exports.testNullMember = function(test) {
	checkOutput(test, "errors/nullMember.e");
};

exports.testNullMethod = function(test) {
	checkOutput(test, "errors/nullMethod.e");
};

exports.testUserException = function(test) {
	checkOutput(test, "errors/userException.e");
};

