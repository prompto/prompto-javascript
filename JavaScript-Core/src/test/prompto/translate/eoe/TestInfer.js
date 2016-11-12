require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testInferDict = function(test) {
	compareResourceEOE(test, "infer/inferDict.pec");
};

exports.testInferList = function(test) {
	compareResourceEOE(test, "infer/inferList.pec");
};

exports.testInferSet = function(test) {
	compareResourceEOE(test, "infer/inferSet.pec");
};

