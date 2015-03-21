require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testBadRead = function(test) {
	compareResourceEOE(test, "resource/badRead.e");
};

exports.testBadResource = function(test) {
	compareResourceEOE(test, "resource/badResource.e");
};

exports.testBadWrite = function(test) {
	compareResourceEOE(test, "resource/badWrite.e");
};

exports.testReadResource = function(test) {
	compareResourceEOE(test, "resource/readResource.e");
};

exports.testReadWithResource = function(test) {
	compareResourceEOE(test, "resource/readWithResource.e");
};

exports.testWriteResource = function(test) {
	compareResourceEOE(test, "resource/writeResource.e");
};

exports.testWriteWithResource = function(test) {
	compareResourceEOE(test, "resource/writeWithResource.e");
};

