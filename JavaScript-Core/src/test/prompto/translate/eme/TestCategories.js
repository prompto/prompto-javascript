require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testComposed = function(test) {
	compareResourceEME(test, "categories/composed.pec");
};

exports.testCopyFromAscendant = function(test) {
	compareResourceEME(test, "categories/copyFromAscendant.pec");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceEME(test, "categories/copyFromAscendantWithOverride.pec");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceEME(test, "categories/copyFromDescendant.pec");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceEME(test, "categories/copyFromDescendantWithOverride.pec");
};

exports.testCopyFromDocument = function(test) {
	compareResourceEME(test, "categories/copyFromDocument.pec");
};

