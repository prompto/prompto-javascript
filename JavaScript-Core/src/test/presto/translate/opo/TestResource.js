require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testBadRead = function(test) {
	compareResourceOPO(test, "resource/badRead.o");
};

exports.testBadResource = function(test) {
	compareResourceOPO(test, "resource/badResource.o");
};

exports.testBadWrite = function(test) {
	compareResourceOPO(test, "resource/badWrite.o");
};

exports.testReadResource = function(test) {
	compareResourceOPO(test, "resource/readResource.o");
};

exports.testReadWithResource = function(test) {
	compareResourceOPO(test, "resource/readWithResource.o");
};

exports.testWriteResource = function(test) {
	compareResourceOPO(test, "resource/writeResource.o");
};

exports.testWriteWithResource = function(test) {
	compareResourceOPO(test, "resource/writeWithResource.o");
};

