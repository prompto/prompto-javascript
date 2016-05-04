require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testComposed = function(test) {
	compareResourceEOE(test, "categories/composed.pec");
};

exports.testCopyFromAscendant = function(test) {
	compareResourceEOE(test, "categories/copyFromAscendant.pec");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceEOE(test, "categories/copyFromAscendantWithOverride.pec");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceEOE(test, "categories/copyFromDescendant.pec");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceEOE(test, "categories/copyFromDescendantWithOverride.pec");
};

exports.testCopyFromDocument = function(test) {
	compareResourceEOE(test, "categories/copyFromDocument.pec");
};

