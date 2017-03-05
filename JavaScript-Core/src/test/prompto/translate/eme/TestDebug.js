require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testStack = function(test) {
	compareResourceEME(test, "debug/stack.pec");
};

exports.testVariables = function(test) {
	compareResourceEME(test, "debug/variables.pec");
};

