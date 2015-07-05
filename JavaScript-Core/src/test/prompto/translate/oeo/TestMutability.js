// generated: 2015-07-05T23:01:02.139
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testImmutable = function(test) {
	compareResourceOEO(test, "mutability/immutable.poc");
};

exports.testImmutableArgument = function(test) {
	compareResourceOEO(test, "mutability/immutableArgument.poc");
};

exports.testImmutableMember = function(test) {
	compareResourceOEO(test, "mutability/immutableMember.poc");
};

exports.testMutable = function(test) {
	compareResourceOEO(test, "mutability/mutable.poc");
};

exports.testMutableArgument = function(test) {
	compareResourceOEO(test, "mutability/mutableArgument.poc");
};

exports.testMutableMember = function(test) {
	compareResourceOEO(test, "mutability/mutableMember.poc");
};

