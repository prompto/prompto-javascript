require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testCallback = function(test) {
	compareResourceOMO(test, "annotations/callback.poc");
};

