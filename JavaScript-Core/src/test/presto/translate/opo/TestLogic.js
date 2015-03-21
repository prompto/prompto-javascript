require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testAndBoolean = function(test) {
	compareResourceOPO(test, "logic/andBoolean.o");
};

exports.testNotBoolean = function(test) {
	compareResourceOPO(test, "logic/notBoolean.o");
};

exports.testOrBoolean = function(test) {
	compareResourceOPO(test, "logic/orBoolean.o");
};

