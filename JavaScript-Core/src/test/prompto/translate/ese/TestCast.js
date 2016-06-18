require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAutoDecimalCast = function(test) {
	compareResourceESE(test, "cast/autoDecimalCast.pec");
};

exports.testAutoDowncast = function(test) {
	compareResourceESE(test, "cast/autoDowncast.pec");
};

exports.testAutoIntegerCast = function(test) {
	compareResourceESE(test, "cast/autoIntegerCast.pec");
};

exports.testCastChild = function(test) {
	compareResourceESE(test, "cast/castChild.pec");
};

exports.testCastDecimal = function(test) {
	compareResourceESE(test, "cast/castDecimal.pec");
};

exports.testCastInteger = function(test) {
	compareResourceESE(test, "cast/castInteger.pec");
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

