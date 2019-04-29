require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testReadResource = function(test) {
	compareResourceEOE(test, "resource/readResource.pec");
};

exports.testReadWithResource = function(test) {
	compareResourceEOE(test, "resource/readWithResource.pec");
};

exports.testWriteResource = function(test) {
	compareResourceEOE(test, "resource/writeResource.pec");
};

exports.testWriteWithResource = function(test) {
	compareResourceEOE(test, "resource/writeWithResource.pec");
};

