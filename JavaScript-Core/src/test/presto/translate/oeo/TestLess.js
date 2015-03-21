require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testLtCharacter = function(test) {
	compareResourceOEO(test, "less/ltCharacter.o");
};

exports.testLtDate = function(test) {
	compareResourceOEO(test, "less/ltDate.o");
};

exports.testLtDateTime = function(test) {
	compareResourceOEO(test, "less/ltDateTime.o");
};

exports.testLtDecimal = function(test) {
	compareResourceOEO(test, "less/ltDecimal.o");
};

exports.testLteCharacter = function(test) {
	compareResourceOEO(test, "less/lteCharacter.o");
};

exports.testLteDate = function(test) {
	compareResourceOEO(test, "less/lteDate.o");
};

exports.testLteDateTime = function(test) {
	compareResourceOEO(test, "less/lteDateTime.o");
};

exports.testLteDecimal = function(test) {
	compareResourceOEO(test, "less/lteDecimal.o");
};

exports.testLteInteger = function(test) {
	compareResourceOEO(test, "less/lteInteger.o");
};

exports.testLteText = function(test) {
	compareResourceOEO(test, "less/lteText.o");
};

exports.testLteTime = function(test) {
	compareResourceOEO(test, "less/lteTime.o");
};

exports.testLtInteger = function(test) {
	compareResourceOEO(test, "less/ltInteger.o");
};

exports.testLtText = function(test) {
	compareResourceOEO(test, "less/ltText.o");
};

exports.testLtTime = function(test) {
	compareResourceOEO(test, "less/ltTime.o");
};

