require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testBlob = function(test) {
	compareResourceEME(test, "documents/blob.pec");
};

exports.testDeepItem = function(test) {
	compareResourceEME(test, "documents/deepItem.pec");
};

exports.testDeepMember = function(test) {
	compareResourceEME(test, "documents/deepMember.pec");
};

exports.testItem = function(test) {
	compareResourceEME(test, "documents/item.pec");
};

exports.testLiteral = function(test) {
	compareResourceEME(test, "documents/literal.pec");
};

exports.testMember = function(test) {
	compareResourceEME(test, "documents/member.pec");
};

exports.testNamedItem = function(test) {
	compareResourceEME(test, "documents/namedItem.pec");
};

