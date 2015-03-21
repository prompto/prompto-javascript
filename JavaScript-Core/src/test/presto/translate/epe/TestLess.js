require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testLtCharacter = function(test) {
	compareResourceEPE(test, "less/ltCharacter.e");
};

exports.testLtDate = function(test) {
	compareResourceEPE(test, "less/ltDate.e");
};

exports.testLtDateTime = function(test) {
	compareResourceEPE(test, "less/ltDateTime.e");
};

exports.testLtDecimal = function(test) {
	compareResourceEPE(test, "less/ltDecimal.e");
};

exports.testLteCharacter = function(test) {
	compareResourceEPE(test, "less/lteCharacter.e");
};

exports.testLteDate = function(test) {
	compareResourceEPE(test, "less/lteDate.e");
};

exports.testLteDateTime = function(test) {
	compareResourceEPE(test, "less/lteDateTime.e");
};

exports.testLteDecimal = function(test) {
	compareResourceEPE(test, "less/lteDecimal.e");
};

exports.testLteInteger = function(test) {
	compareResourceEPE(test, "less/lteInteger.e");
};

exports.testLteText = function(test) {
	compareResourceEPE(test, "less/lteText.e");
};

exports.testLteTime = function(test) {
	compareResourceEPE(test, "less/lteTime.e");
};

exports.testLtInteger = function(test) {
	compareResourceEPE(test, "less/ltInteger.e");
};

exports.testLtText = function(test) {
	compareResourceEPE(test, "less/ltText.e");
};

exports.testLtTime = function(test) {
	compareResourceEPE(test, "less/ltTime.e");
};

