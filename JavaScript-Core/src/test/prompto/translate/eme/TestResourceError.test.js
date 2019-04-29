require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testBadRead = function(test) {
	compareResourceEME(test, "resourceError/badRead.pec");
};

exports.testBadResource = function(test) {
	compareResourceEME(test, "resourceError/badResource.pec");
};

exports.testBadWrite = function(test) {
	compareResourceEME(test, "resourceError/badWrite.pec");
};

