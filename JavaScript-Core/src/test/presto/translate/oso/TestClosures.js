require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceOSO(test, "closures/globalClosureNoArg.poc");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceOSO(test, "closures/globalClosureWithArg.poc");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceOSO(test, "closures/instanceClosureNoArg.poc");
};

