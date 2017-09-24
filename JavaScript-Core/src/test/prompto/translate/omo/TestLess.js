require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testLtCharacter = function(test) {
	compareResourceOMO(test, "less/ltCharacter.poc");
};

exports.testLtDate = function(test) {
	compareResourceOMO(test, "less/ltDate.poc");
};

exports.testLtDateTime = function(test) {
	compareResourceOMO(test, "less/ltDateTime.poc");
};

exports.testLtDecimal = function(test) {
	compareResourceOMO(test, "less/ltDecimal.poc");
};

exports.testLteCharacter = function(test) {
	compareResourceOMO(test, "less/lteCharacter.poc");
};

exports.testLteDate = function(test) {
	compareResourceOMO(test, "less/lteDate.poc");
};

exports.testLteDateTime = function(test) {
	compareResourceOMO(test, "less/lteDateTime.poc");
};

exports.testLteDecimal = function(test) {
	compareResourceOMO(test, "less/lteDecimal.poc");
};

exports.testLteInteger = function(test) {
	compareResourceOMO(test, "less/lteInteger.poc");
};

exports.testLteText = function(test) {
	compareResourceOMO(test, "less/lteText.poc");
};

exports.testLteTime = function(test) {
	compareResourceOMO(test, "less/lteTime.poc");
};

exports.testLtInteger = function(test) {
	compareResourceOMO(test, "less/ltInteger.poc");
};

exports.testLtText = function(test) {
	compareResourceOMO(test, "less/ltText.poc");
};

exports.testLtTime = function(test) {
	compareResourceOMO(test, "less/ltTime.poc");
};

exports.testLtVersion = function(test) {
	compareResourceOMO(test, "less/ltVersion.poc");
};

