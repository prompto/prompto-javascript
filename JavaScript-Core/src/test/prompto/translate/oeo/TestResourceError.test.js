require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testBadRead = function(test) {
	compareResourceOEO(test, "resourceError/badRead.poc");
};

exports.testBadResource = function(test) {
	compareResourceOEO(test, "resourceError/badResource.poc");
};

exports.testBadWrite = function(test) {
	compareResourceOEO(test, "resourceError/badWrite.poc");
};

