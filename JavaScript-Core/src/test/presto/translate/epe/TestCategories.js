require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testCopyFromAscendant = function(test) {
	compareResourceEPE(test, "categories/copyFromAscendant.e");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceEPE(test, "categories/copyFromAscendantWithOverride.e");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceEPE(test, "categories/copyFromDescendant.e");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceEPE(test, "categories/copyFromDescendantWithOverride.e");
};

