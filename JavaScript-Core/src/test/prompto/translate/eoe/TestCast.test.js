require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAutoDecimalCast = function(test) {
	compareResourceEOE(test, "cast/autoDecimalCast.pec");
};

exports.testAutoDowncast = function(test) {
	compareResourceEOE(test, "cast/autoDowncast.pec");
};

exports.testAutoIntegerCast = function(test) {
	compareResourceEOE(test, "cast/autoIntegerCast.pec");
};

exports.testCastChild = function(test) {
	compareResourceEOE(test, "cast/castChild.pec");
};

exports.testCastDecimal = function(test) {
	compareResourceEOE(test, "cast/castDecimal.pec");
};

exports.testCastDocument = function(test) {
	compareResourceEOE(test, "cast/castDocument.pec");
};

exports.testCastInteger = function(test) {
	compareResourceEOE(test, "cast/castInteger.pec");
};

exports.testCastMethod = function(test) {
	compareResourceEOE(test, "cast/castMethod.pec");
};

exports.testCastMissing = function(test) {
	compareResourceEOE(test, "cast/castMissing.pec");
};

exports.testCastNull = function(test) {
	compareResourceEOE(test, "cast/castNull.pec");
};

exports.testCastRoot = function(test) {
	compareResourceEOE(test, "cast/castRoot.pec");
};

exports.testIsAChild = function(test) {
	compareResourceEOE(test, "cast/isAChild.pec");
};

exports.testIsAText = function(test) {
	compareResourceEOE(test, "cast/isAText.pec");
};

