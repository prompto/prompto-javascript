require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testForEachIntegerList = function(test) {
	compareResourceOEO(test, "iterate/forEachIntegerList.poc");
};

