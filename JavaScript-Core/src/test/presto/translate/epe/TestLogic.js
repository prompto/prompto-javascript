require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testAndBoolean = function(test) {
	compareResourceEPE(test, "logic/andBoolean.e");
};

exports.testNotBoolean = function(test) {
	compareResourceEPE(test, "logic/notBoolean.e");
};

exports.testOrBoolean = function(test) {
	compareResourceEPE(test, "logic/orBoolean.e");
};

