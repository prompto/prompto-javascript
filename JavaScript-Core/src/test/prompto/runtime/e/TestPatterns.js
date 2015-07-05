// generated: 2015-07-05T23:01:02.156
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
	checkOutput(test, "patterns/integerEnumeration.pec");
};

exports.testIntegerPattern = function(test) {
	checkOutput(test, "patterns/integerPattern.pec");
};

exports.testNegativeIntegerRange = function(test) {
	checkOutput(test, "patterns/negativeIntegerRange.pec");
};

exports.testPositiveIntegerRange = function(test) {
	checkOutput(test, "patterns/positiveIntegerRange.pec");
};

exports.testTextEnumeration = function(test) {
	checkOutput(test, "patterns/textEnumeration.pec");
};

exports.testTextPattern = function(test) {
	checkOutput(test, "patterns/textPattern.pec");
};

