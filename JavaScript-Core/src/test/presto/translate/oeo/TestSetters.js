require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testGetter = function(test) {
	compareResourceOEO(test, "setters/getter.o");
};

exports.testSetter = function(test) {
	compareResourceOEO(test, "setters/setter.o");
};

