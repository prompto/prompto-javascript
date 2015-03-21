require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testGetter = function(test) {
	compareResourceEPE(test, "setters/getter.e");
};

exports.testSetter = function(test) {
	compareResourceEPE(test, "setters/setter.e");
};

