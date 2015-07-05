// generated: 2015-07-05T23:01:02.142
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAnyId = function(test) {
	compareResourceEOE(test, "native/anyId.pec");
};

exports.testAnyText = function(test) {
	compareResourceEOE(test, "native/anyText.pec");
};

exports.testAttribute = function(test) {
	compareResourceEOE(test, "native/attribute.pec");
};

exports.testCategory = function(test) {
	compareResourceEOE(test, "native/category.pec");
};

exports.testMethod = function(test) {
	compareResourceEOE(test, "native/method.pec");
};

exports.testPrinter = function(test) {
	compareResourceEOE(test, "native/printer.pec");
};

exports.testReturn = function(test) {
	compareResourceEOE(test, "native/return.pec");
};

