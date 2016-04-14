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

exports.testComposed = function(test) {
	checkOutput(test, "categories/composed.pec");
};

exports.testCopyFromAscendant = function(test) {
	checkOutput(test, "categories/copyFromAscendant.pec");
};

exports.testCopyFromAscendantWithOverride = function(test) {
	checkOutput(test, "categories/copyFromAscendantWithOverride.pec");
};

exports.testCopyFromDescendant = function(test) {
	checkOutput(test, "categories/copyFromDescendant.pec");
};

exports.testCopyFromDescendantWithOverride = function(test) {
	checkOutput(test, "categories/copyFromDescendantWithOverride.pec");
};

