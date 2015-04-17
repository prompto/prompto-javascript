require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testImmutable = function(test) {
	compareResourceESE(test, "mutability/immutable.pec");
};

exports.testMutable = function(test) {
	compareResourceESE(test, "mutability/mutable.pec");
};

