require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testFilterFromCursor = function(test) {
	compareResourceEME(test, "filter/filterFromCursor.pec");
};

exports.testFilterFromList = function(test) {
	compareResourceEME(test, "filter/filterFromList.pec");
};

exports.testFilterFromSet = function(test) {
	compareResourceEME(test, "filter/filterFromSet.pec");
};

