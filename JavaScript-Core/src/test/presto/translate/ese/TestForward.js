require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testForward = function(test) {
	compareResourceESE(test, "forward/forward.pec");
};

