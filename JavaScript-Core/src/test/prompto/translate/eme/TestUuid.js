require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testUuid = function(test) {
	compareResourceEME(test, "uuid/uuid.pec");
};

