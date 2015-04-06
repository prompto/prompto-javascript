require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testGetter = function(test) {
	compareResourceOEO(test, "setters/getter.poc");
};

exports.testSetter = function(test) {
	compareResourceOEO(test, "setters/setter.poc");
};

