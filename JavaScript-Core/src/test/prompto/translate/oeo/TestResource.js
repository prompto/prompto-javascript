require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testBadRead = function(test) {
	compareResourceOEO(test, "resource/badRead.poc");
};

exports.testBadResource = function(test) {
	compareResourceOEO(test, "resource/badResource.poc");
};

exports.testBadWrite = function(test) {
	compareResourceOEO(test, "resource/badWrite.poc");
};

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

