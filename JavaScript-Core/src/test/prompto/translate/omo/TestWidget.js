require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testMinimal = function(test) {
	compareResourceOMO(test, "widget/minimal.poc");
};

