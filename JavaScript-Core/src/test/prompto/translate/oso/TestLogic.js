// generated: 2015-07-05T23:01:02.109
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAndBoolean = function(test) {
	compareResourceOSO(test, "logic/andBoolean.poc");
};

exports.testNotBoolean = function(test) {
	compareResourceOSO(test, "logic/notBoolean.poc");
};

exports.testOrBoolean = function(test) {
	compareResourceOSO(test, "logic/orBoolean.poc");
};

