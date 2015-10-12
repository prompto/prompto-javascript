require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceEOE(test, "closures/globalClosureNoArg.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testGlobalClosureWithArg = function(test) {
	compareResourceEOE(test, "closures/globalClosureWithArg.pec");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceEOE(test, "closures/instanceClosureNoArg.pec");
};

