require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceOPO(test, "closures/globalClosureNoArg.o");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceOPO(test, "closures/globalClosureWithArg.o");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceOPO(test, "closures/instanceClosureNoArg.o");
};

