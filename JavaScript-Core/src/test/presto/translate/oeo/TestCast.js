require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAutoDowncast = function(test) {
	compareResourceOEO(test, "cast/autoDowncast.o");
};

exports.testCastChild = function(test) {
	compareResourceOEO(test, "cast/castChild.o");
};

exports.testIsAChild = function(test) {
	compareResourceOEO(test, "cast/isAChild.o");
};

exports.testIsAText = function(test) {
	compareResourceOEO(test, "cast/isAText.o");
};

