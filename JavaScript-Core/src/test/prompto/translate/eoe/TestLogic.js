// generated: 2015-07-05T23:01:02.106
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

