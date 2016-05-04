require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testCopyFromAscendant = function(test) {
	compareResourceOSO(test, "categories/copyFromAscendant.poc");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceOSO(test, "categories/copyFromAscendantWithOverride.poc");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceOSO(test, "categories/copyFromDescendant.poc");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceOSO(test, "categories/copyFromDescendantWithOverride.poc");
};

exports.testCopyFromDocument = function(test) {
	compareResourceOSO(test, "categories/copyFromDocument.poc");
};

