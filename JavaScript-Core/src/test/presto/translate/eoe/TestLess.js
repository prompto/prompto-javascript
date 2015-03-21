require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testLtCharacter = function(test) {
	compareResourceEOE(test, "less/ltCharacter.e");
};

exports.testLtDate = function(test) {
	compareResourceEOE(test, "less/ltDate.e");
};

exports.testLtDateTime = function(test) {
	compareResourceEOE(test, "less/ltDateTime.e");
};

exports.testLtDecimal = function(test) {
	compareResourceEOE(test, "less/ltDecimal.e");
};

exports.testLteCharacter = function(test) {
	compareResourceEOE(test, "less/lteCharacter.e");
};

exports.testLteDate = function(test) {
	compareResourceEOE(test, "less/lteDate.e");
};

exports.testLteDateTime = function(test) {
	compareResourceEOE(test, "less/lteDateTime.e");
};

exports.testLteDecimal = function(test) {
	compareResourceEOE(test, "less/lteDecimal.e");
};

exports.testLteInteger = function(test) {
	compareResourceEOE(test, "less/lteInteger.e");
};

exports.testLteText = function(test) {
	compareResourceEOE(test, "less/lteText.e");
};

exports.testLteTime = function(test) {
	compareResourceEOE(test, "less/lteTime.e");
};

exports.testLtInteger = function(test) {
	compareResourceEOE(test, "less/ltInteger.e");
};

exports.testLtText = function(test) {
	compareResourceEOE(test, "less/ltText.e");
};

exports.testLtTime = function(test) {
	compareResourceEOE(test, "less/ltTime.e");
};

