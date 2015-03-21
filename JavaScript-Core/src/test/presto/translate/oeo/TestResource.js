require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testBadRead = function(test) {
	compareResourceOEO(test, "resource/badRead.o");
};

exports.testBadResource = function(test) {
	compareResourceOEO(test, "resource/badResource.o");
};

exports.testBadWrite = function(test) {
	compareResourceOEO(test, "resource/badWrite.o");
};

exports.testReadResource = function(test) {
	compareResourceOEO(test, "resource/readResource.o");
};

exports.testReadWithResource = function(test) {
	compareResourceOEO(test, "resource/readWithResource.o");
};

exports.testWriteResource = function(test) {
	compareResourceOEO(test, "resource/writeResource.o");
};

exports.testWriteWithResource = function(test) {
	compareResourceOEO(test, "resource/writeWithResource.o");
};

