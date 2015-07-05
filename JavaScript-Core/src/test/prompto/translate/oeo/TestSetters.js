// generated: 2015-07-05T23:01:02.176
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testGetter = function(test) {
	compareResourceOEO(test, "setters/getter.poc");
};

exports.testSetter = function(test) {
	compareResourceOEO(test, "setters/setter.poc");
};

