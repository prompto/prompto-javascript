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

exports.testNegative = function(test) {
	checkOutput(test, "testing/negative.e");
};

exports.testNegativeError = function(test) {
	checkOutput(test, "testing/negativeError.e");
};

exports.testPositive = function(test) {
	checkOutput(test, "testing/positive.e");
};

exports.testPositiveError = function(test) {
	checkOutput(test, "testing/positiveError.e");
};

