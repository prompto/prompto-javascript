// generated: 2015-07-05T23:01:02.106
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAndBoolean = function(test) {
	compareResourceESE(test, "logic/andBoolean.pec");
};

exports.testNotBoolean = function(test) {
	compareResourceESE(test, "logic/notBoolean.pec");
};

exports.testOrBoolean = function(test) {
	compareResourceESE(test, "logic/orBoolean.pec");
};

