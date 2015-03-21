require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testFetchFromList = function(test) {
	compareResourceOEO(test, "fetch/fetchFromList.o");
};

exports.testFetchFromSet = function(test) {
	compareResourceOEO(test, "fetch/fetchFromSet.o");
};

