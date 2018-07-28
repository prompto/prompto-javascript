require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMinimal = function(test) {
	compareResourceOEO(test, "widget/minimal.poc");
};

exports.testNative = function(test) {
	compareResourceOEO(test, "widget/native.poc");
};

exports.testWithEvent = function(test) {
	compareResourceOEO(test, "widget/withEvent.poc");
};

