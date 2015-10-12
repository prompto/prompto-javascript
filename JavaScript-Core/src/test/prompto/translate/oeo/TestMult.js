require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMultCharacter = function(test) {
	compareResourceOEO(test, "mult/multCharacter.poc");
};

exports.testMultDecimal = function(test) {
	compareResourceOEO(test, "mult/multDecimal.poc");
};

exports.testMultInteger = function(test) {
	compareResourceOEO(test, "mult/multInteger.poc");
};

exports.testMultList = function(test) {
	compareResourceOEO(test, "mult/multList.poc");
};

exports.testMultPeriod = function(test) {
	compareResourceOEO(test, "mult/multPeriod.poc");
};

exports.testMultText = function(test) {
	compareResourceOEO(test, "mult/multText.poc");
};

