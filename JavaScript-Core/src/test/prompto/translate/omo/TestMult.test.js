require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testMultCharacter = function(test) {
	compareResourceOMO(test, "mult/multCharacter.poc");
};

exports.testMultDecimal = function(test) {
	compareResourceOMO(test, "mult/multDecimal.poc");
};

exports.testMultInteger = function(test) {
	compareResourceOMO(test, "mult/multInteger.poc");
};

exports.testMultList = function(test) {
	compareResourceOMO(test, "mult/multList.poc");
};

exports.testMultPeriod = function(test) {
	compareResourceOMO(test, "mult/multPeriod.poc");
};

exports.testMultText = function(test) {
	compareResourceOMO(test, "mult/multText.poc");
};

