require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testFilterFromCursor = function(test) {
	compareResourceEOE(test, "filter/filterFromCursor.pec");
};

exports.testFilterFromList = function(test) {
	compareResourceEOE(test, "filter/filterFromList.pec");
};

exports.testFilterFromSet = function(test) {
	compareResourceEOE(test, "filter/filterFromSet.pec");
};

