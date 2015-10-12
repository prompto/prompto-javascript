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

exports.testIntegerEnumeration = function(test) {
	checkOutput(test, "patterns/integerEnumeration.poc");
};

exports.testIntegerPattern = function(test) {
	checkOutput(test, "patterns/integerPattern.poc");
};

exports.testNegativeIntegerRange = function(test) {
	checkOutput(test, "patterns/negativeIntegerRange.poc");
};

exports.testPositiveIntegerRange = function(test) {
	checkOutput(test, "patterns/positiveIntegerRange.poc");
};

exports.testTextEnumeration = function(test) {
	checkOutput(test, "patterns/textEnumeration.poc");
};

exports.testTextPattern = function(test) {
	checkOutput(test, "patterns/textPattern.poc");
};

