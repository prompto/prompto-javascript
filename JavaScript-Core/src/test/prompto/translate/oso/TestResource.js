require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testBadRead = function(test) {
	compareResourceOSO(test, "resource/badRead.poc");
};

exports.testBadResource = function(test) {
	compareResourceOSO(test, "resource/badResource.poc");
};

exports.testBadWrite = function(test) {
	compareResourceOSO(test, "resource/badWrite.poc");
};

exports.testReadResource = function(test) {
	compareResourceOSO(test, "resource/readResource.poc");
};

exports.testReadWithResource = function(test) {
	compareResourceOSO(test, "resource/readWithResource.poc");
};

exports.testWriteResource = function(test) {
	compareResourceOSO(test, "resource/writeResource.poc");
};

exports.testWriteWithResource = function(test) {
	compareResourceOSO(test, "resource/writeWithResource.poc");
};

