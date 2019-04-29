require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testBadRead = function(test) {
	compareResourceOMO(test, "resourceError/badRead.poc");
};

exports.testBadResource = function(test) {
	compareResourceOMO(test, "resourceError/badResource.poc");
};

exports.testBadWrite = function(test) {
	compareResourceOMO(test, "resourceError/badWrite.poc");
};

