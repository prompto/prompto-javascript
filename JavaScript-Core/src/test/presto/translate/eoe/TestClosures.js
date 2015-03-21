require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceEOE(test, "closures/globalClosureNoArg.e");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceEOE(test, "closures/globalClosureWithArg.e");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceEOE(test, "closures/instanceClosureNoArg.e");
};

