require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCopyFromAscendant = function(test) {
	compareResourceEOE(test, "categories/copyFromAscendant.e");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceEOE(test, "categories/copyFromAscendantWithOverride.e");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceEOE(test, "categories/copyFromDescendant.e");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceEOE(test, "categories/copyFromDescendantWithOverride.e");
};

