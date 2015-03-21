require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceEPE(test, "closures/globalClosureNoArg.e");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceEPE(test, "closures/globalClosureWithArg.e");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceEPE(test, "closures/instanceClosureNoArg.e");
};

