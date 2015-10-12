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

exports.testFetchFromList = function(test) {
	checkOutput(test, "fetch/fetchFromList.poc");
};

exports.testFetchFromSet = function(test) {
	checkOutput(test, "fetch/fetchFromSet.poc");
};

