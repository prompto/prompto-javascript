require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testAutoDowncast = function(test) {
	compareResourceEPE(test, "cast/autoDowncast.e");
};

exports.testCastChild = function(test) {
	compareResourceEPE(test, "cast/castChild.e");
};

exports.testIsAChild = function(test) {
	compareResourceEPE(test, "cast/isAChild.e");
};

exports.testIsAText = function(test) {
	compareResourceEPE(test, "cast/isAText.e");
};

