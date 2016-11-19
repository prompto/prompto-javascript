require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testAutoDowncast = function(test) {
	compareResourceOMO(test, "cast/autoDowncast.poc");
};

exports.testCastChild = function(test) {
	compareResourceOMO(test, "cast/castChild.poc");
};

exports.testCastMissing = function(test) {
	compareResourceOMO(test, "cast/castMissing.poc");
};

exports.testCastNull = function(test) {
	compareResourceOMO(test, "cast/castNull.poc");
};

exports.testIsAChild = function(test) {
	compareResourceOMO(test, "cast/isAChild.poc");
};

exports.testIsAText = function(test) {
	compareResourceOMO(test, "cast/isAText.poc");
};

