require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCopyFromAscendant = function(test) {
	compareResourceOEO(test, "categories/copyFromAscendant.o");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceOEO(test, "categories/copyFromAscendantWithOverride.o");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceOEO(test, "categories/copyFromDescendant.o");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceOEO(test, "categories/copyFromDescendantWithOverride.o");
};

