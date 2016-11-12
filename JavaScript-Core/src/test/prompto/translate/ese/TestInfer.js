require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testInferDict = function(test) {
	compareResourceESE(test, "infer/inferDict.pec");
};

exports.testInferList = function(test) {
	compareResourceESE(test, "infer/inferList.pec");
};

exports.testInferSet = function(test) {
	compareResourceESE(test, "infer/inferSet.pec");
};

