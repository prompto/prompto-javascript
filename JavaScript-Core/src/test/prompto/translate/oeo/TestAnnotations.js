require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCallback = function(test) {
	compareResourceOEO(test, "annotations/callback.poc");
};

