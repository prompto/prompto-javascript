require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testForEachIntegerList = function(test) {
	compareResourceESE(test, "iterate/forEachIntegerList.pec");
};

