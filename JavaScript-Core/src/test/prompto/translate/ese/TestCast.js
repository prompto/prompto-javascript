require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAutoDowncast = function(test) {
	compareResourceESE(test, "cast/autoDowncast.pec");
};

exports.testCastChild = function(test) {
	compareResourceESE(test, "cast/castChild.pec");
};

exports.testCastMissing = function(test) {
	compareResourceESE(test, "cast/castMissing.pec");
};

exports.testCastNull = function(test) {
	compareResourceESE(test, "cast/castNull.pec");
};

exports.testIsAChild = function(test) {
	compareResourceESE(test, "cast/isAChild.pec");
};

exports.testIsAText = function(test) {
	compareResourceESE(test, "cast/isAText.pec");
};

