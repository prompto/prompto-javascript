require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testCopyFromAscendant = function(test) {
	compareResourceOPO(test, "categories/copyFromAscendant.o");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	compareResourceOPO(test, "categories/copyFromAscendantWithOverride.o");
};

exports.testCopyFromDescendant = function(test) {
	compareResourceOPO(test, "categories/copyFromDescendant.o");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	compareResourceOPO(test, "categories/copyFromDescendantWithOverride.o");
};

