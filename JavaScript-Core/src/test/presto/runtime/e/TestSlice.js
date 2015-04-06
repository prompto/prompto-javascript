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

exports.testSliceList = function(test) {
	checkOutput(test, "slice/sliceList.pec");
};

exports.testSliceRange = function(test) {
	checkOutput(test, "slice/sliceRange.pec");
};

exports.testSliceText = function(test) {
	checkOutput(test, "slice/sliceText.pec");
};

