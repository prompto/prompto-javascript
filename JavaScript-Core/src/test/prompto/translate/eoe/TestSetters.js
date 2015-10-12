require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testGetter = function(test) {
	compareResourceEOE(test, "setters/getter.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testGetterCall = function(test) {
	compareResourceEOE(test, "setters/getterCall.pec");
};

exports.testSetter = function(test) {
	compareResourceEOE(test, "setters/setter.pec");
};

