// generated: 2015-07-05T23:01:02.131
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testMultCharacter = function(test) {
	compareResourceESE(test, "mult/multCharacter.pec");
};

exports.testMultDecimal = function(test) {
	compareResourceESE(test, "mult/multDecimal.pec");
};

exports.testMultInteger = function(test) {
	compareResourceESE(test, "mult/multInteger.pec");
};

exports.testMultList = function(test) {
	compareResourceESE(test, "mult/multList.pec");
};

exports.testMultPeriod = function(test) {
	compareResourceESE(test, "mult/multPeriod.pec");
};

exports.testMultText = function(test) {
	compareResourceESE(test, "mult/multText.pec");
};

