require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCategory = function(test) {
	compareResourceEOE(test, "native/category.pec");
};

exports.testMethod = function(test) {
	compareResourceEOE(test, "native/method.pec");
};

exports.testPrint = function(test) {
	compareResourceEOE(test, "native/print.pec");
};

exports.testReturn = function(test) {
	compareResourceEOE(test, "native/return.pec");
};

