require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceOEO(test, "closures/globalClosureNoArg.o");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceOEO(test, "closures/globalClosureWithArg.o");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceOEO(test, "closures/instanceClosureNoArg.o");
};

