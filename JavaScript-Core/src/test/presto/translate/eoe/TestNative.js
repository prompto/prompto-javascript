require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCategory = function(test) {
	compareResourceEOE(test, "native/category.e");
};

exports.testMethod = function(test) {
	compareResourceEOE(test, "native/method.e");
};

exports.testReturn = function(test) {
	compareResourceEOE(test, "native/return.e");
};

