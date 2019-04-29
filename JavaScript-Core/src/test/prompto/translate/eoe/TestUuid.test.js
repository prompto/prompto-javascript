require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testUuid = function(test) {
	compareResourceEOE(test, "uuid/uuid.pec");
};

