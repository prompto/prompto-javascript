require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCallback = function(test) {
	compareResourceOEO(test, "annotations/callback.poc");
};

exports.testCategory = function(test) {
	compareResourceOEO(test, "annotations/category.poc");
};

