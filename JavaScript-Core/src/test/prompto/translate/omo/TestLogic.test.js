require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testAndBoolean = function(test) {
	compareResourceOMO(test, "logic/andBoolean.poc");
};

exports.testNotBoolean = function(test) {
	compareResourceOMO(test, "logic/notBoolean.poc");
};

exports.testOrBoolean = function(test) {
	compareResourceOMO(test, "logic/orBoolean.poc");
};

