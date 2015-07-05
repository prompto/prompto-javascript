// generated: 2015-07-05T23:01:02.005
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
	checkOutput(test, "categories/copyFromAscendant.poc");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	checkOutput(test, "categories/copyFromAscendantWithOverride.poc");
};

exports.testCopyFromDescendant = function(test) {
	checkOutput(test, "categories/copyFromDescendant.poc");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	checkOutput(test, "categories/copyFromDescendantWithOverride.poc");
};

