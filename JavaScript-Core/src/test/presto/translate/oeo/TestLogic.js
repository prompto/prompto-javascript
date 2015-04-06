require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAndBoolean = function(test) {
	compareResourceOEO(test, "logic/andBoolean.poc");
};

exports.testNotBoolean = function(test) {
	compareResourceOEO(test, "logic/notBoolean.poc");
};

exports.testOrBoolean = function(test) {
	compareResourceOEO(test, "logic/orBoolean.poc");
};

