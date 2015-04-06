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
	checkOutput(test, "mult/multCharacter.pec");
};

exports.testMultDecimal = function(test) {
	checkOutput(test, "mult/multDecimal.pec");
};

exports.testMultInteger = function(test) {
	checkOutput(test, "mult/multInteger.pec");
};

exports.testMultList = function(test) {
	checkOutput(test, "mult/multList.pec");
};

exports.testMultPeriod = function(test) {
	checkOutput(test, "mult/multPeriod.pec");
};

exports.testMultText = function(test) {
	checkOutput(test, "mult/multText.pec");
};

