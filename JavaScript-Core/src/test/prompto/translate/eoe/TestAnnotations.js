require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCallback = function(test) {
	compareResourceEOE(test, "annotations/callback.pec");
};

