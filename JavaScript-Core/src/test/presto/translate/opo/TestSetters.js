require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testGetter = function(test) {
	compareResourceOPO(test, "setters/getter.o");
};

exports.testSetter = function(test) {
	compareResourceOPO(test, "setters/setter.o");
};

