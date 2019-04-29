require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testReadResource = function(test) {
	compareResourceOEO(test, "resource/readResource.poc");
};

exports.testReadWithResource = function(test) {
	compareResourceOEO(test, "resource/readWithResource.poc");
};

exports.testWriteResource = function(test) {
	compareResourceOEO(test, "resource/writeResource.poc");
};

exports.testWriteWithResource = function(test) {
	compareResourceOEO(test, "resource/writeWithResource.poc");
};

