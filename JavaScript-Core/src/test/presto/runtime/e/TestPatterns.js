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

exports.testIntegerEnumeration = function(test) {
	checkOutput(test, "patterns/integerEnumeration.e");
};

exports.testIntegerPattern = function(test) {
	checkOutput(test, "patterns/integerPattern.e");
};

exports.testNegativeIntegerRange = function(test) {
	checkOutput(test, "patterns/negativeIntegerRange.e");
};

exports.testPositiveIntegerRange = function(test) {
	checkOutput(test, "patterns/positiveIntegerRange.e");
};

exports.testTextEnumeration = function(test) {
	checkOutput(test, "patterns/textEnumeration.e");
};

exports.testTextPattern = function(test) {
	checkOutput(test, "patterns/textPattern.e");
};

