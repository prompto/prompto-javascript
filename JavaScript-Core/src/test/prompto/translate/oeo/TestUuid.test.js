require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testUuid = function(test) {
	compareResourceOEO(test, "uuid/uuid.poc");
};

