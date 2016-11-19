require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAnyId = function(test) {
	compareResourceEME(test, "native/anyId.pec");
};

exports.testAnyText = function(test) {
	compareResourceEME(test, "native/anyText.pec");
};

exports.testAttribute = function(test) {
	compareResourceEME(test, "native/attribute.pec");
};

exports.testCategory = function(test) {
	compareResourceEME(test, "native/category.pec");
};

exports.testMethod = function(test) {
	compareResourceEME(test, "native/method.pec");
};

exports.testNow = function(test) {
	compareResourceEME(test, "native/now.pec");
};

exports.testPrinter = function(test) {
	compareResourceEME(test, "native/printer.pec");
};

exports.testReturn = function(test) {
	compareResourceEME(test, "native/return.pec");
};

