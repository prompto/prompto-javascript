require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testBadRead = function(test) {
	compareResourceEOE(test, "resourceError/badRead.pec");
};

exports.testBadResource = function(test) {
	compareResourceEOE(test, "resourceError/badResource.pec");
};

exports.testBadWrite = function(test) {
	compareResourceEOE(test, "resourceError/badWrite.pec");
};

