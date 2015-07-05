// generated: 2015-07-05T23:01:01.999
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAutoDowncast = function(test) {
	compareResourceOSO(test, "cast/autoDowncast.poc");
};

exports.testCastChild = function(test) {
	compareResourceOSO(test, "cast/castChild.poc");
};

exports.testIsAChild = function(test) {
	compareResourceOSO(test, "cast/isAChild.poc");
};

exports.testIsAText = function(test) {
	compareResourceOSO(test, "cast/isAText.poc");
};

