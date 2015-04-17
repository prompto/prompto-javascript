require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testImmutable = function(test) {
	compareResourceOSO(test, "mutability/immutable.poc");
};

exports.testMutable = function(test) {
	compareResourceOSO(test, "mutability/mutable.poc");
};

