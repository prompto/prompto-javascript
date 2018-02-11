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

exports.testFilterFromCursor = function(test) {
	checkOutput(test, "filter/filterFromCursor.pec");
};

exports.testFilterFromList = function(test) {
	checkOutput(test, "filter/filterFromList.pec");
};

exports.testFilterFromSet = function(test) {
	checkOutput(test, "filter/filterFromSet.pec");
};

