require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testInferDict = function(test) {
	compareResourceEME(test, "infer/inferDict.pec");
};

exports.testInferList = function(test) {
	compareResourceEME(test, "infer/inferList.pec");
};

exports.testInferSet = function(test) {
	compareResourceEME(test, "infer/inferSet.pec");
};

