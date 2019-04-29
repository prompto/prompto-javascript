require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testGetter = function(test) {
	compareResourceEME(test, "setters/getter.pec");
};

exports.testGetterCall = function(test) {
	compareResourceEME(test, "setters/getterCall.pec");
};

exports.testSetter = function(test) {
	compareResourceEME(test, "setters/setter.pec");
};

