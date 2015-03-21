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

exports.testMultCharacter = function(test) {
	checkOutput(test, "mult/multCharacter.e");
};

exports.testMultDecimal = function(test) {
	checkOutput(test, "mult/multDecimal.e");
};

exports.testMultInteger = function(test) {
	checkOutput(test, "mult/multInteger.e");
};

exports.testMultList = function(test) {
	checkOutput(test, "mult/multList.e");
};

exports.testMultPeriod = function(test) {
	checkOutput(test, "mult/multPeriod.e");
};

exports.testMultText = function(test) {
	checkOutput(test, "mult/multText.e");
};

