require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testCallback = function(test) {
	compareResourceEME(test, "annotations/callback.pec");
};

