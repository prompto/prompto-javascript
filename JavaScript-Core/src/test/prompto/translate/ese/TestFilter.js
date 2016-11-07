require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testFilterFromList = function(test) {
	compareResourceESE(test, "filter/filterFromList.pec");
};

exports.testFilterFromSet = function(test) {
	compareResourceESE(test, "filter/filterFromSet.pec");
};

