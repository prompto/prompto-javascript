// generated: 2015-07-05T23:01:02.143
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAnyId = function(test) {
	compareResourceESE(test, "native/anyId.pec");
};

exports.testAnyText = function(test) {
	compareResourceESE(test, "native/anyText.pec");
};

exports.testAttribute = function(test) {
	compareResourceESE(test, "native/attribute.pec");
};

exports.testCategory = function(test) {
	compareResourceESE(test, "native/category.pec");
};

exports.testMethod = function(test) {
	compareResourceESE(test, "native/method.pec");
};

exports.testPrinter = function(test) {
	compareResourceESE(test, "native/printer.pec");
};

exports.testReturn = function(test) {
	compareResourceESE(test, "native/return.pec");
};

