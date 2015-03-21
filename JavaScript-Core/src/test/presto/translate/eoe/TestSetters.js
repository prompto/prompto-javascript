require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testGetter = function(test) {
	compareResourceEOE(test, "setters/getter.e");
};

exports.testSetter = function(test) {
	compareResourceEOE(test, "setters/setter.e");
};

