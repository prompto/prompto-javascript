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

exports.testFetchFromList = function(test) {
	checkOutput(test, "fetch/fetchFromList.e");
};

exports.testFetchFromSet = function(test) {
	checkOutput(test, "fetch/fetchFromSet.e");
};

