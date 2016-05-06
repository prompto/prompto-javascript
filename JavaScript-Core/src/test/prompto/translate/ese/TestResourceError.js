require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testBadRead = function(test) {
	compareResourceESE(test, "resourceError/badRead.pec");
};

exports.testBadResource = function(test) {
	compareResourceESE(test, "resourceError/badResource.pec");
};

exports.testBadWrite = function(test) {
	compareResourceESE(test, "resourceError/badWrite.pec");
};

