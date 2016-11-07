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

exports.testFilterFromList = function(test) {
	checkOutput(test, "filter/filterFromList.poc");
};

exports.testFilterFromSet = function(test) {
	checkOutput(test, "filter/filterFromSet.poc");
};

