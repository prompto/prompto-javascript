require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testForward = function(test) {
	compareResourceEPE(test, "forward/forward.e");
};

