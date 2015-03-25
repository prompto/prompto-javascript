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

exports.testNegative = function(test) {
	checkOutput(test, "testing/negative.o");
};

exports.testNegativeError = function(test) {
	checkOutput(test, "testing/negativeError.o");
};

exports.testPositive = function(test) {
	checkOutput(test, "testing/positive.o");
};

exports.testPositiveError = function(test) {
	checkOutput(test, "testing/positiveError.o");
};

