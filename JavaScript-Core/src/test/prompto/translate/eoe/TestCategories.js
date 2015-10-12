require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCopyFromAscendant = function(test) {
	compareResourceEOE(test, "categories/copyFromAscendant.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceEOE(test, "categories/copyFromAscendantWithOverride.pec");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceEOE(test, "categories/copyFromDescendant.pec");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceEOE(test, "categories/copyFromDescendantWithOverride.pec");
};

