require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCallback = function(test) {
	compareResourceEOE(test, "annotations/callback.pec");
};

exports.testCategory = function(test) {
	compareResourceEOE(test, "annotations/category.pec");
};

