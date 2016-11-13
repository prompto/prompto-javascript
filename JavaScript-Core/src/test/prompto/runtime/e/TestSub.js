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
	checkOutput(test, "sub/subDate.pec");
};

exports.testSubDateTime = function(test) {
	checkOutput(test, "sub/subDateTime.pec");
};

exports.testSubDecimal = function(test) {
	checkOutput(test, "sub/subDecimal.pec");
};

exports.testSubDecimalEnum = function(test) {
	checkOutput(test, "sub/subDecimalEnum.pec");
};

exports.testSubInteger = function(test) {
	checkOutput(test, "sub/subInteger.pec");
};

exports.testSubIntegerEnum = function(test) {
	checkOutput(test, "sub/subIntegerEnum.pec");
};

exports.testSubPeriod = function(test) {
	checkOutput(test, "sub/subPeriod.pec");
};

exports.testSubTime = function(test) {
	checkOutput(test, "sub/subTime.pec");
};

