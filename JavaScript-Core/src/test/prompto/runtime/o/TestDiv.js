// generated: 2015-07-05T23:01:02.032
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

exports.testDivDecimal = function(test) {
	checkOutput(test, "div/divDecimal.poc");
};

exports.testDivInteger = function(test) {
	checkOutput(test, "div/divInteger.poc");
};

exports.testIdivInteger = function(test) {
	checkOutput(test, "div/idivInteger.poc");
};

exports.testModInteger = function(test) {
	checkOutput(test, "div/modInteger.poc");
};

