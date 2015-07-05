// generated: 2015-07-05T23:01:02.177
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testGetter = function(test) {
	compareResourceOSO(test, "setters/getter.poc");
};

exports.testSetter = function(test) {
	compareResourceOSO(test, "setters/setter.poc");
};

