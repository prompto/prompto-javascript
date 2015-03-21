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

exports.testSubDate = function(test) {
	checkOutput(test, "sub/subDate.e");
};

exports.testSubDateTime = function(test) {
	checkOutput(test, "sub/subDateTime.e");
};

exports.testSubDecimal = function(test) {
	checkOutput(test, "sub/subDecimal.e");
};

exports.testSubInteger = function(test) {
	checkOutput(test, "sub/subInteger.e");
};

exports.testSubPeriod = function(test) {
	checkOutput(test, "sub/subPeriod.e");
};

exports.testSubTime = function(test) {
	checkOutput(test, "sub/subTime.e");
};

