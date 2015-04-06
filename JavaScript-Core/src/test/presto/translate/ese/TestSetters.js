require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testGetter = function(test) {
	compareResourceESE(test, "setters/getter.pec");
};

exports.testSetter = function(test) {
	compareResourceESE(test, "setters/setter.pec");
};

