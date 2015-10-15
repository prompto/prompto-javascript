require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testStack = function(test) {
	compareResourceEOE(test, "debug/stack.pec");
};

