// generated: 2015-07-05T23:01:02.007
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceEOE(test, "closures/globalClosureNoArg.pec");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceEOE(test, "closures/globalClosureWithArg.pec");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceEOE(test, "closures/instanceClosureNoArg.pec");
};

