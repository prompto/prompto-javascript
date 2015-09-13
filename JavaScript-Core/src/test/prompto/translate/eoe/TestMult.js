// generated: 2015-07-05T23:01:02.130
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMultCharacter = function(test) {
	compareResourceEOE(test, "mult/multCharacter.pec");
};

exports.testMultDecimal = function(test) {
	compareResourceEOE(test, "mult/multDecimal.pec");
};

exports.testMultInteger = function(test) {
	compareResourceEOE(test, "mult/multInteger.pec");
};

exports.testMultList = function(test) {
	compareResourceEOE(test, "mult/multList.pec");
};

exports.testMultPeriod = function(test) {
	compareResourceEOE(test, "mult/multPeriod.pec");
};

exports.testMultText = function(test) {
	compareResourceEOE(test, "mult/multText.pec");
};
