require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceEME(test, "closures/globalClosureNoArg.pec");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceEME(test, "closures/globalClosureWithArg.pec");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceEME(test, "closures/instanceClosureNoArg.pec");
};

exports.testParameterClosure = function(test) {
	compareResourceEME(test, "closures/parameterClosure.pec");
};

