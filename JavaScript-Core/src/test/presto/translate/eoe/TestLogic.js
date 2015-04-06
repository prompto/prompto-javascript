require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAndBoolean = function(test) {
	compareResourceEOE(test, "logic/andBoolean.pec");
};

exports.testNotBoolean = function(test) {
	compareResourceEOE(test, "logic/notBoolean.pec");
};

exports.testOrBoolean = function(test) {
	compareResourceEOE(test, "logic/orBoolean.pec");
};

