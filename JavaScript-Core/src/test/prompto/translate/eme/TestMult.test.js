require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testMultCharacter = function(test) {
	compareResourceEME(test, "mult/multCharacter.pec");
};

exports.testMultDecimal = function(test) {
	compareResourceEME(test, "mult/multDecimal.pec");
};

exports.testMultInteger = function(test) {
	compareResourceEME(test, "mult/multInteger.pec");
};

exports.testMultList = function(test) {
	compareResourceEME(test, "mult/multList.pec");
};

exports.testMultPeriod = function(test) {
	compareResourceEME(test, "mult/multPeriod.pec");
};

exports.testMultText = function(test) {
	compareResourceEME(test, "mult/multText.pec");
};

