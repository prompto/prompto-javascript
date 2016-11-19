require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testStack = function(test) {
	compareResourceEME(test, "debug/stack.pec");
};

