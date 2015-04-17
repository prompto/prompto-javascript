require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testCategory = function(test) {
	compareResourceESE(test, "native/category.pec");
};

exports.testMethod = function(test) {
	compareResourceESE(test, "native/method.pec");
};

exports.testPrint = function(test) {
	compareResourceESE(test, "native/print.pec");
};

exports.testReturn = function(test) {
	compareResourceESE(test, "native/return.pec");
};

