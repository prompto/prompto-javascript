require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testLtCharacter = function(test) {
	compareResourceOSO(test, "less/ltCharacter.poc");
};

exports.testLtDate = function(test) {
	compareResourceOSO(test, "less/ltDate.poc");
};

exports.testLtDateTime = function(test) {
	compareResourceOSO(test, "less/ltDateTime.poc");
};

exports.testLtDecimal = function(test) {
	compareResourceOSO(test, "less/ltDecimal.poc");
};

exports.testLteCharacter = function(test) {
	compareResourceOSO(test, "less/lteCharacter.poc");
};

exports.testLteDate = function(test) {
	compareResourceOSO(test, "less/lteDate.poc");
};

exports.testLteDateTime = function(test) {
	compareResourceOSO(test, "less/lteDateTime.poc");
};

exports.testLteDecimal = function(test) {
	compareResourceOSO(test, "less/lteDecimal.poc");
};

exports.testLteInteger = function(test) {
	compareResourceOSO(test, "less/lteInteger.poc");
};

exports.testLteText = function(test) {
	compareResourceOSO(test, "less/lteText.poc");
};

exports.testLteTime = function(test) {
	compareResourceOSO(test, "less/lteTime.poc");
};

exports.testLtInteger = function(test) {
	compareResourceOSO(test, "less/ltInteger.poc");
};

exports.testLtText = function(test) {
	compareResourceOSO(test, "less/ltText.poc");
};

exports.testLtTime = function(test) {
	compareResourceOSO(test, "less/ltTime.poc");
};

