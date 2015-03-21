require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testDivideByZero = function(test) {
	checkOutput(test, "errors/divideByZero.o");
};

exports.testIndexOutOfRange_listItem = function(test) {
	checkOutput(test, "errors/indexOutOfRange-listItem.o");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceList.o");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceRange.o");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceText.o");
};

exports.testNullDict = function(test) {
	checkOutput(test, "errors/nullDict.o");
};

exports.testNullItem = function(test) {
	checkOutput(test, "errors/nullItem.o");
};

exports.testNullKey = function(test) {
	checkOutput(test, "errors/nullKey.o");
};

exports.testNullMember = function(test) {
	checkOutput(test, "errors/nullMember.o");
};

exports.testNullMethod = function(test) {
	checkOutput(test, "errors/nullMethod.o");
};

exports.testUserException = function(test) {
	checkOutput(test, "errors/userException.o");
};

