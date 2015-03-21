require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testMultCharacter = function(test) {
	compareResourceEPE(test, "mult/multCharacter.e");
};

exports.testMultDecimal = function(test) {
	compareResourceEPE(test, "mult/multDecimal.e");
};

exports.testMultInteger = function(test) {
	compareResourceEPE(test, "mult/multInteger.e");
};

exports.testMultList = function(test) {
	compareResourceEPE(test, "mult/multList.e");
};

exports.testMultPeriod = function(test) {
	compareResourceEPE(test, "mult/multPeriod.e");
};

exports.testMultText = function(test) {
	compareResourceEPE(test, "mult/multText.e");
};

