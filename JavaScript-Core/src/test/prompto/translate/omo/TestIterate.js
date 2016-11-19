require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testForEachIntegerList = function(test) {
	compareResourceOMO(test, "iterate/forEachIntegerList.poc");
};

