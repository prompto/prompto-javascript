require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testCopyFromAscendant = function(test) {
	compareResourceOMO(test, "categories/copyFromAscendant.poc");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceOMO(test, "categories/copyFromAscendantWithOverride.poc");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceOMO(test, "categories/copyFromDescendant.poc");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceOMO(test, "categories/copyFromDescendantWithOverride.poc");
};

exports.testCopyFromDocument = function(test) {
	compareResourceOMO(test, "categories/copyFromDocument.poc");
};

exports.testCopyFromStored = function(test) {
	compareResourceOMO(test, "categories/copyFromStored.poc");
};

