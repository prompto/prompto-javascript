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
	checkOutput(test, "slice/sliceList.o");
};

exports.testSliceRange = function(test) {
	checkOutput(test, "slice/sliceRange.o");
};

exports.testSliceText = function(test) {
	checkOutput(test, "slice/sliceText.o");
};

