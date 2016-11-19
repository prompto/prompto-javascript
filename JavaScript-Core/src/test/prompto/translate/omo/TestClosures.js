require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceOMO(test, "closures/globalClosureNoArg.poc");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceOMO(test, "closures/globalClosureWithArg.poc");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceOMO(test, "closures/instanceClosureNoArg.poc");
};

