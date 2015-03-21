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
	checkOutput(test, "sub/subDate.o");
};

exports.testSubDateTime = function(test) {
	checkOutput(test, "sub/subDateTime.o");
};

exports.testSubDecimal = function(test) {
	checkOutput(test, "sub/subDecimal.o");
};

exports.testSubInteger = function(test) {
	checkOutput(test, "sub/subInteger.o");
};

exports.testSubPeriod = function(test) {
	checkOutput(test, "sub/subPeriod.o");
};

exports.testSubTime = function(test) {
	checkOutput(test, "sub/subTime.o");
};

