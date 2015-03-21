require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testForward = function(test) {
	compareResourceEOE(test, "forward/forward.e");
};

