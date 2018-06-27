require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMinimal = function(test) {
	compareResourceOEO(test, "widget/minimal.poc");
};

