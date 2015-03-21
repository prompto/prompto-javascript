require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testLtCharacter = function(test) {
	compareResourceOPO(test, "less/ltCharacter.o");
};

exports.testLtDate = function(test) {
	compareResourceOPO(test, "less/ltDate.o");
};

exports.testLtDateTime = function(test) {
	compareResourceOPO(test, "less/ltDateTime.o");
};

exports.testLtDecimal = function(test) {
	compareResourceOPO(test, "less/ltDecimal.o");
};

exports.testLteCharacter = function(test) {
	compareResourceOPO(test, "less/lteCharacter.o");
};

exports.testLteDate = function(test) {
	compareResourceOPO(test, "less/lteDate.o");
};

exports.testLteDateTime = function(test) {
	compareResourceOPO(test, "less/lteDateTime.o");
};

exports.testLteDecimal = function(test) {
	compareResourceOPO(test, "less/lteDecimal.o");
};

exports.testLteInteger = function(test) {
	compareResourceOPO(test, "less/lteInteger.o");
};

exports.testLteText = function(test) {
	compareResourceOPO(test, "less/lteText.o");
};

exports.testLteTime = function(test) {
	compareResourceOPO(test, "less/lteTime.o");
};

exports.testLtInteger = function(test) {
	compareResourceOPO(test, "less/ltInteger.o");
};

exports.testLtText = function(test) {
	compareResourceOPO(test, "less/ltText.o");
};

exports.testLtTime = function(test) {
	compareResourceOPO(test, "less/ltTime.o");
};

