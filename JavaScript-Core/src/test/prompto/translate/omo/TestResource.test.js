require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testReadResource = function(test) {
	compareResourceOMO(test, "resource/readResource.poc");
};

exports.testReadWithResource = function(test) {
	compareResourceOMO(test, "resource/readWithResource.poc");
};

exports.testWriteResource = function(test) {
	compareResourceOMO(test, "resource/writeResource.poc");
};

exports.testWriteWithResource = function(test) {
	compareResourceOMO(test, "resource/writeWithResource.poc");
};

