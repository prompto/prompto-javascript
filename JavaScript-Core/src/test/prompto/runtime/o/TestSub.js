// generated: 2015-07-05T23:01:02.214
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

exports.testSubDate = function(test) {
	checkOutput(test, "sub/subDate.poc");
};

exports.testSubDateTime = function(test) {
	checkOutput(test, "sub/subDateTime.poc");
};

exports.testSubDecimal = function(test) {
	checkOutput(test, "sub/subDecimal.poc");
};

exports.testSubInteger = function(test) {
	checkOutput(test, "sub/subInteger.poc");
};

exports.testSubPeriod = function(test) {
	checkOutput(test, "sub/subPeriod.poc");
};

exports.testSubTime = function(test) {
	checkOutput(test, "sub/subTime.poc");
};

