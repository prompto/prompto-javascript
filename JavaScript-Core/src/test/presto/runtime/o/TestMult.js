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
	checkOutput(test, "mult/multCharacter.o");
};

exports.testMultDecimal = function(test) {
	checkOutput(test, "mult/multDecimal.o");
};

exports.testMultInteger = function(test) {
	checkOutput(test, "mult/multInteger.o");
};

exports.testMultList = function(test) {
	checkOutput(test, "mult/multList.o");
};

exports.testMultPeriod = function(test) {
	checkOutput(test, "mult/multPeriod.o");
};

exports.testMultText = function(test) {
	checkOutput(test, "mult/multText.o");
};

