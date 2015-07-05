// generated: 2015-07-05T23:01:02.173
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testGetter = function(test) {
	compareResourceEOE(test, "setters/getter.pec");
};

exports.testGetterCall = function(test) {
	compareResourceEOE(test, "setters/getterCall.pec");
};

exports.testSetter = function(test) {
	compareResourceEOE(test, "setters/setter.pec");
};

