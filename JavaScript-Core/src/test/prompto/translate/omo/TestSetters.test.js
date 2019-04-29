require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testGetter = function(test) {
	compareResourceOMO(test, "setters/getter.poc");
};

exports.testSetter = function(test) {
	compareResourceOMO(test, "setters/setter.poc");
};

