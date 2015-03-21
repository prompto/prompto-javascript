require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testAutoDowncast = function(test) {
	compareResourceOPO(test, "cast/autoDowncast.o");
};

exports.testCastChild = function(test) {
	compareResourceOPO(test, "cast/castChild.o");
};

exports.testIsAChild = function(test) {
	compareResourceOPO(test, "cast/isAChild.o");
};

exports.testIsAText = function(test) {
	compareResourceOPO(test, "cast/isAText.o");
};

