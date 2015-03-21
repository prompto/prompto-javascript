require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testStack = function(test) {
	compareResourceEPE(test, "debug/stack.e");
};

