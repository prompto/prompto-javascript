require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testRecord = function(test) {
	compareResourceEOE(test, "store/record.pec");
};

