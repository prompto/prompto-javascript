require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAndBoolean = function(test) {
	compareResourceOEO(test, "logic/andBoolean.o");
};

exports.testNotBoolean = function(test) {
	compareResourceOEO(test, "logic/notBoolean.o");
};

exports.testOrBoolean = function(test) {
	compareResourceOEO(test, "logic/orBoolean.o");
};

