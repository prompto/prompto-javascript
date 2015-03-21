require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAndBoolean = function(test) {
	compareResourceEOE(test, "logic/andBoolean.e");
};

exports.testNotBoolean = function(test) {
	compareResourceEOE(test, "logic/notBoolean.e");
};

exports.testOrBoolean = function(test) {
	compareResourceEOE(test, "logic/orBoolean.e");
};

