require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAutoDecimalCast = function(test) {
	compareResourceEME(test, "cast/autoDecimalCast.pec");
};

exports.testAutoDowncast = function(test) {
	compareResourceEME(test, "cast/autoDowncast.pec");
};

exports.testAutoIntegerCast = function(test) {
	compareResourceEME(test, "cast/autoIntegerCast.pec");
};

exports.testCastChild = function(test) {
	compareResourceEME(test, "cast/castChild.pec");
};

exports.testCastDecimal = function(test) {
	compareResourceEME(test, "cast/castDecimal.pec");
};

exports.testCastDocument = function(test) {
	compareResourceEME(test, "cast/castDocument.pec");
};

exports.testCastInteger = function(test) {
	compareResourceEME(test, "cast/castInteger.pec");
};

exports.testCastMissing = function(test) {
	compareResourceEME(test, "cast/castMissing.pec");
};

exports.testCastNull = function(test) {
	compareResourceEME(test, "cast/castNull.pec");
};

exports.testCastRoot = function(test) {
	compareResourceEME(test, "cast/castRoot.pec");
};

exports.testIsAChild = function(test) {
	compareResourceEME(test, "cast/isAChild.pec");
};

exports.testIsAText = function(test) {
	compareResourceEME(test, "cast/isAText.pec");
};

