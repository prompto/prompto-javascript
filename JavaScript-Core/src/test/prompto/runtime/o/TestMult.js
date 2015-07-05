// generated: 2015-07-05T23:01:02.134
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

exports.testMultCharacter = function(test) {
	checkOutput(test, "mult/multCharacter.poc");
};

exports.testMultDecimal = function(test) {
	checkOutput(test, "mult/multDecimal.poc");
};

exports.testMultInteger = function(test) {
	checkOutput(test, "mult/multInteger.poc");
};

exports.testMultList = function(test) {
	checkOutput(test, "mult/multList.poc");
};

exports.testMultPeriod = function(test) {
	checkOutput(test, "mult/multPeriod.poc");
};

exports.testMultText = function(test) {
	checkOutput(test, "mult/multText.poc");
};

