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
	checkOutput(test, "errors/divideByZero.pec");
};

exports.testIndexOutOfRange_listItem = function(test) {
	checkOutput(test, "errors/indexOutOfRange-listItem.pec");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceList.pec");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceRange.pec");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	checkOutput(test, "errors/indexOutOfRange-sliceText.pec");
};

exports.testNullDict = function(test) {
	checkOutput(test, "errors/nullDict.pec");
};

exports.testNullItem = function(test) {
	checkOutput(test, "errors/nullItem.pec");
};

exports.testNullKey = function(test) {
	checkOutput(test, "errors/nullKey.pec");
};

exports.testNullMember = function(test) {
	checkOutput(test, "errors/nullMember.pec");
};

exports.testNullMethod = function(test) {
	checkOutput(test, "errors/nullMethod.pec");
};

exports.testUserException = function(test) {
	checkOutput(test, "errors/userException.pec");
};

