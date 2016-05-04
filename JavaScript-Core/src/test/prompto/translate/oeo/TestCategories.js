require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCopyFromAscendant = function(test) {
	compareResourceOEO(test, "categories/copyFromAscendant.poc");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceOEO(test, "categories/copyFromAscendantWithOverride.poc");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceOEO(test, "categories/copyFromDescendant.poc");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceOEO(test, "categories/copyFromDescendantWithOverride.poc");
};

exports.testCopyFromDocument = function(test) {
	compareResourceOEO(test, "categories/copyFromDocument.poc");
};

