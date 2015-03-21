require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testMultCharacter = function(test) {
	compareResourceOPO(test, "mult/multCharacter.o");
};

exports.testMultDecimal = function(test) {
	compareResourceOPO(test, "mult/multDecimal.o");
};

exports.testMultInteger = function(test) {
	compareResourceOPO(test, "mult/multInteger.o");
};

exports.testMultList = function(test) {
	compareResourceOPO(test, "mult/multList.o");
};

exports.testMultPeriod = function(test) {
	compareResourceOPO(test, "mult/multPeriod.o");
};

exports.testMultText = function(test) {
	compareResourceOPO(test, "mult/multText.o");
};

