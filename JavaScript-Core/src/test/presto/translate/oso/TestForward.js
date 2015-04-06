require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testForward = function(test) {
	compareResourceOSO(test, "forward/forward.poc");
};

