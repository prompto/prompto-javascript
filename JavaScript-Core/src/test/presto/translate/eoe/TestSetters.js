require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testGetter = function(test) {
	compareResourceEOE(test, "setters/getter.pec");
};

exports.testSetter = function(test) {
	compareResourceEOE(test, "setters/setter.pec");
};

