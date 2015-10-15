require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAutoDowncast = function(test) {
	compareResourceEOE(test, "cast/autoDowncast.pec");
};

exports.testCastChild = function(test) {
	compareResourceEOE(test, "cast/castChild.pec");
};

exports.testIsAChild = function(test) {
	compareResourceEOE(test, "cast/isAChild.pec");
};

exports.testIsAText = function(test) {
	compareResourceEOE(test, "cast/isAText.pec");
};

