require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAutoDowncast = function(test) {
	compareResourceOEO(test, "cast/autoDowncast.poc");
};

exports.testCastChild = function(test) {
	compareResourceOEO(test, "cast/castChild.poc");
};

exports.testCastMethod = function(test) {
	compareResourceOEO(test, "cast/castMethod.poc");
};

exports.testCastMissing = function(test) {
	compareResourceOEO(test, "cast/castMissing.poc");
};

exports.testCastNull = function(test) {
	compareResourceOEO(test, "cast/castNull.poc");
};

exports.testIsAChild = function(test) {
	compareResourceOEO(test, "cast/isAChild.poc");
};

exports.testIsAText = function(test) {
	compareResourceOEO(test, "cast/isAText.poc");
};

