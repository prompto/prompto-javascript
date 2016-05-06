require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testBadRead = function(test) {
	compareResourceOSO(test, "resourceError/badRead.poc");
};

exports.testBadResource = function(test) {
	compareResourceOSO(test, "resourceError/badResource.poc");
};

exports.testBadWrite = function(test) {
	compareResourceOSO(test, "resourceError/badWrite.poc");
};

