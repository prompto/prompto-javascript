require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testMinimal = function(test) {
	compareResourceOMO(test, "widget/minimal.poc");
};

exports.testNative = function(test) {
	compareResourceOMO(test, "widget/native.poc");
};

