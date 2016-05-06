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

exports.testReadResource = function(test) {
	checkOutput(test, "resource/readResource.poc");
};

exports.testReadWithResource = function(test) {
	checkOutput(test, "resource/readWithResource.poc");
};

exports.testWriteResource = function(test) {
	checkOutput(test, "resource/writeResource.poc");
};

exports.testWriteWithResource = function(test) {
	checkOutput(test, "resource/writeWithResource.poc");
};

