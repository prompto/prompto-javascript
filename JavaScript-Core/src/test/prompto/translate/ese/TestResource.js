// generated: 2015-07-05T23:01:02.162
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testBadRead = function(test) {
	compareResourceESE(test, "resource/badRead.pec");
};

exports.testBadResource = function(test) {
	compareResourceESE(test, "resource/badResource.pec");
};

exports.testBadWrite = function(test) {
	compareResourceESE(test, "resource/badWrite.pec");
};

exports.testReadResource = function(test) {
	compareResourceESE(test, "resource/readResource.pec");
};

exports.testReadWithResource = function(test) {
	compareResourceESE(test, "resource/readWithResource.pec");
};

exports.testWriteResource = function(test) {
	compareResourceESE(test, "resource/writeResource.pec");
};

exports.testWriteWithResource = function(test) {
	compareResourceESE(test, "resource/writeWithResource.pec");
};

