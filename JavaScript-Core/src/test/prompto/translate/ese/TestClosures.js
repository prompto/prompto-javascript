// generated: 2015-07-05T23:01:02.008
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceESE(test, "closures/globalClosureNoArg.pec");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceESE(test, "closures/globalClosureWithArg.pec");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceESE(test, "closures/instanceClosureNoArg.pec");
};
