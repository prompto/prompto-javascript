require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testBadRead = function(test) {
	compareResourceEPE(test, "resource/badRead.e");
};

exports.testBadResource = function(test) {
	compareResourceEPE(test, "resource/badResource.e");
};

exports.testBadWrite = function(test) {
	compareResourceEPE(test, "resource/badWrite.e");
};

exports.testReadResource = function(test) {
	compareResourceEPE(test, "resource/readResource.e");
};

exports.testReadWithResource = function(test) {
	compareResourceEPE(test, "resource/readWithResource.e");
};

exports.testWriteResource = function(test) {
	compareResourceEPE(test, "resource/writeResource.e");
};

exports.testWriteWithResource = function(test) {
	compareResourceEPE(test, "resource/writeWithResource.e");
};

