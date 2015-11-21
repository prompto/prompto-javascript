require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testForEachIntegerList = function(test) {
	compareResourceOSO(test, "iterate/forEachIntegerList.poc");
};

