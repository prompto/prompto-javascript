require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testForward = function(test) {
	compareResourceEME(test, "forward/forward.pec");
};

