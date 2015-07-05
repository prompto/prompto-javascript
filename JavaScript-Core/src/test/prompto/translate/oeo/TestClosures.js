// generated: 2015-07-05T23:01:02.009
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testGlobalClosureNoArg = function(test) {
	compareResourceOEO(test, "closures/globalClosureNoArg.poc");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceOEO(test, "closures/globalClosureWithArg.poc");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceOEO(test, "closures/instanceClosureNoArg.poc");
};

