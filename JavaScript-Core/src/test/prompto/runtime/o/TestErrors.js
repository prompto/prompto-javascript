// generated: 2015-07-05T23:01:02.059
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
	checkOutput(test, "errors/divideByZero.poc");
};

exports.testIndexOutOfRange_listItem = function(test) {
	checkOutput(test, "errors/indexOutOfRange-listItem.poc");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceList.poc");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceRange.poc");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceText.poc");
};

exports.testNullDict = function(test) {
	checkOutput(test, "errors/nullDict.poc");
};

exports.testNullItem = function(test) {
	checkOutput(test, "errors/nullItem.poc");
};

exports.testNullKey = function(test) {
	checkOutput(test, "errors/nullKey.poc");
};

exports.testNullMember = function(test) {
	checkOutput(test, "errors/nullMember.poc");
};

exports.testNullMethod = function(test) {
	checkOutput(test, "errors/nullMethod.poc");
};

exports.testUserException = function(test) {
	checkOutput(test, "errors/userException.poc");
};

