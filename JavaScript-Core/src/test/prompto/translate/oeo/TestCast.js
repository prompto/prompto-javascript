// generated: 2015-07-05T23:01:01.998
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAutoDowncast = function(test) {
	compareResourceOEO(test, "cast/autoDowncast.poc");
};

exports.testCastChild = function(test) {
	compareResourceOEO(test, "cast/castChild.poc");
};

exports.testIsAChild = function(test) {
	compareResourceOEO(test, "cast/isAChild.poc");
};

exports.testIsAText = function(test) {
	compareResourceOEO(test, "cast/isAText.poc");
};

