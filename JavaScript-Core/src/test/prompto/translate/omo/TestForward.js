require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testForward = function(test) {
	compareResourceOMO(test, "forward/forward.poc");
};

