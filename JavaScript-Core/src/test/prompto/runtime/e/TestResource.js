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

exports.testReadResource = function(test) {
	checkOutput(test, "resource/readResource.pec");
};

exports.testReadWithResource = function(test) {
	checkOutput(test, "resource/readWithResource.pec");
};

exports.testWriteResource = function(test) {
	checkOutput(test, "resource/writeResource.pec");
};

exports.testWriteWithResource = function(test) {
	checkOutput(test, "resource/writeWithResource.pec");
};

