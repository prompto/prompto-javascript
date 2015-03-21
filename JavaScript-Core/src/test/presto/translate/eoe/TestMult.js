require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMultCharacter = function(test) {
	compareResourceEOE(test, "mult/multCharacter.e");
};

exports.testMultDecimal = function(test) {
	compareResourceEOE(test, "mult/multDecimal.e");
};

exports.testMultInteger = function(test) {
	compareResourceEOE(test, "mult/multInteger.e");
};

exports.testMultList = function(test) {
	compareResourceEOE(test, "mult/multList.e");
};

exports.testMultPeriod = function(test) {
	compareResourceEOE(test, "mult/multPeriod.e");
};

exports.testMultText = function(test) {
	compareResourceEOE(test, "mult/multText.e");
};

