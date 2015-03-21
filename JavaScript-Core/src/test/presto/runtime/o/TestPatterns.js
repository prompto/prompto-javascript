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
	checkOutput(test, "patterns/integerEnumeration.o");
};

exports.testIntegerPattern = function(test) {
	checkOutput(test, "patterns/integerPattern.o");
};

exports.testNegativeIntegerRange = function(test) {
	checkOutput(test, "patterns/negativeIntegerRange.o");
};

exports.testPositiveIntegerRange = function(test) {
	checkOutput(test, "patterns/positiveIntegerRange.o");
};

exports.testTextEnumeration = function(test) {
	checkOutput(test, "patterns/textEnumeration.o");
};

exports.testTextPattern = function(test) {
	checkOutput(test, "patterns/textPattern.o");
};

