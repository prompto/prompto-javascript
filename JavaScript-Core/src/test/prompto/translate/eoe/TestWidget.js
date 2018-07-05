require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMinimal = function(test) {
	compareResourceEOE(test, "widget/minimal.pec");
};

exports.testNative = function(test) {
	compareResourceEOE(test, "widget/native.pec");
};

