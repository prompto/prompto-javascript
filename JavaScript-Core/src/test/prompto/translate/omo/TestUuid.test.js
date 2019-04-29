require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testUuid = function(test) {
	compareResourceOMO(test, "uuid/uuid.poc");
};

