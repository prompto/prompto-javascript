require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testMultCharacter = function(test) {
	compareResourceOSO(test, "mult/multCharacter.poc");
};

exports.testMultDecimal = function(test) {
	compareResourceOSO(test, "mult/multDecimal.poc");
};

exports.testMultInteger = function(test) {
	compareResourceOSO(test, "mult/multInteger.poc");
};

exports.testMultList = function(test) {
	compareResourceOSO(test, "mult/multList.poc");
};

exports.testMultPeriod = function(test) {
	compareResourceOSO(test, "mult/multPeriod.poc");
};

exports.testMultText = function(test) {
	compareResourceOSO(test, "mult/multText.poc");
};

