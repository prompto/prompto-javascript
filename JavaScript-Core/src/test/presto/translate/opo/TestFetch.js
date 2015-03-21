require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testFetchFromList = function(test) {
	compareResourceOPO(test, "fetch/fetchFromList.o");
};

exports.testFetchFromSet = function(test) {
	compareResourceOPO(test, "fetch/fetchFromSet.o");
};

