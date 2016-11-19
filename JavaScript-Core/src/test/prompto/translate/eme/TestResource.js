require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testReadResource = function(test) {
	compareResourceEME(test, "resource/readResource.pec");
};

exports.testReadWithResource = function(test) {
	compareResourceEME(test, "resource/readWithResource.pec");
};

exports.testWriteResource = function(test) {
	compareResourceEME(test, "resource/writeResource.pec");
};

exports.testWriteWithResource = function(test) {
	compareResourceEME(test, "resource/writeWithResource.pec");
};

