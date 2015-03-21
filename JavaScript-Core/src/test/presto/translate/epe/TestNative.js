require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testCategory = function(test) {
	compareResourceEPE(test, "native/category.e");
};

exports.testMethod = function(test) {
	compareResourceEPE(test, "native/method.e");
};

exports.testReturn = function(test) {
	compareResourceEPE(test, "native/return.e");
};

