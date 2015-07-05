// generated: 2015-07-05T23:01:02.192
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

exports.testSliceList = function(test) {
	checkOutput(test, "slice/sliceList.poc");
};

exports.testSliceRange = function(test) {
	checkOutput(test, "slice/sliceRange.poc");
};

exports.testSliceText = function(test) {
	checkOutput(test, "slice/sliceText.poc");
};

