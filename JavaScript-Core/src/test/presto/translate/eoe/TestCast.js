require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAutoDowncast = function(test) {
	compareResourceEOE(test, "cast/autoDowncast.e");
};

exports.testCastChild = function(test) {
	compareResourceEOE(test, "cast/castChild.e");
};

exports.testIsAChild = function(test) {
	compareResourceEOE(test, "cast/isAChild.e");
};

exports.testIsAText = function(test) {
	compareResourceEOE(test, "cast/isAText.e");
};

