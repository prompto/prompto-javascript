require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testCopyFromAscendant = function(test) {
	checkOutput(test, "categories/copyFromAscendant.e");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	checkOutput(test, "categories/copyFromAscendantWithOverride.e");
};

exports.testCopyFromDescendant = function(test) {
	checkOutput(test, "categories/copyFromDescendant.e");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	checkOutput(test, "categories/copyFromDescendantWithOverride.e");
};

