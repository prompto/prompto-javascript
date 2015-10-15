require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testStack = function(test) {
	compareResourceESE(test, "debug/stack.pec");
};

