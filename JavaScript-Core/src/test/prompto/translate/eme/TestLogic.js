require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAndBoolean = function(test) {
	compareResourceEME(test, "logic/andBoolean.pec");
};

exports.testNotBoolean = function(test) {
	compareResourceEME(test, "logic/notBoolean.pec");
};

exports.testOrBoolean = function(test) {
	compareResourceEME(test, "logic/orBoolean.pec");
};

