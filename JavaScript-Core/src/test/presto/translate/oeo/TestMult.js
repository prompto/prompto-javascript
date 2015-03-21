require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMultCharacter = function(test) {
	compareResourceOEO(test, "mult/multCharacter.o");
};

exports.testMultDecimal = function(test) {
	compareResourceOEO(test, "mult/multDecimal.o");
};

exports.testMultInteger = function(test) {
	compareResourceOEO(test, "mult/multInteger.o");
};

exports.testMultList = function(test) {
	compareResourceOEO(test, "mult/multList.o");
};

exports.testMultPeriod = function(test) {
	compareResourceOEO(test, "mult/multPeriod.o");
};

exports.testMultText = function(test) {
	compareResourceOEO(test, "mult/multText.o");
};

