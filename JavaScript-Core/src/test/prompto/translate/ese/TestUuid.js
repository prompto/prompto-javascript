require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testUuid = function(test) {
	compareResourceESE(test, "uuid/uuid.pec");
};

