require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testCopyFromAscendant = function(test) {
	checkOutput(test, "categories/copyFromAscendant.o");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	checkOutput(test, "categories/copyFromAscendantWithOverride.o");
};

exports.testCopyFromDescendant = function(test) {
	checkOutput(test, "categories/copyFromDescendant.o");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	checkOutput(test, "categories/copyFromDescendantWithOverride.o");
};

