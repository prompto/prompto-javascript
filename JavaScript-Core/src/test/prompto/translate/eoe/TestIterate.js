require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testForEachIntegerList = function(test) {
	compareResourceEOE(test, "iterate/forEachIntegerList.pec");
};

