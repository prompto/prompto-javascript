require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testImmutable = function(test) {
	compareResourceEOE(test, "mutability/immutable.pec");
};

exports.testMutable = function(test) {
	compareResourceEOE(test, "mutability/mutable.pec");
};

