require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testGetter = function(test) {
	compareResourceOSO(test, "setters/getter.poc");
};

exports.testSetter = function(test) {
	compareResourceOSO(test, "setters/setter.poc");
};

