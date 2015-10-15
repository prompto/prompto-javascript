require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testRecord = function(test) {
	compareResourceESE(test, "store/record.pec");
};

