require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testComposed = function(test) {
	compareResourceESE(test, "categories/composed.pec");
};

exports.testCopyFromAscendant = function(test) {
	compareResourceESE(test, "categories/copyFromAscendant.pec");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceESE(test, "categories/copyFromAscendantWithOverride.pec");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceESE(test, "categories/copyFromDescendant.pec");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceESE(test, "categories/copyFromDescendantWithOverride.pec");
};

exports.testCopyFromDocument = function(test) {
	compareResourceESE(test, "categories/copyFromDocument.pec");
};

