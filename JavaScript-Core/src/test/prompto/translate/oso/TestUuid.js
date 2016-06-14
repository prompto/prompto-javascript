require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testUuid = function(test) {
	compareResourceOSO(test, "uuid/uuid.poc");
};

