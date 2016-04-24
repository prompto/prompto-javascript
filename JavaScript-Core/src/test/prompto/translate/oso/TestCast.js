require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAutoDowncast = function(test) {
	compareResourceOSO(test, "cast/autoDowncast.poc");
};

exports.testCastChild = function(test) {
	compareResourceOSO(test, "cast/castChild.poc");
};

exports.testCastMissing = function(test) {
	compareResourceOSO(test, "cast/castMissing.poc");
};

exports.testIsAChild = function(test) {
	compareResourceOSO(test, "cast/isAChild.poc");
};

exports.testIsAText = function(test) {
	compareResourceOSO(test, "cast/isAText.poc");
};

