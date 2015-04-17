require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testImmutable = function(test) {
	compareResourceOEO(test, "mutability/immutable.poc");
};

exports.testMutable = function(test) {
	compareResourceOEO(test, "mutability/mutable.poc");
};

