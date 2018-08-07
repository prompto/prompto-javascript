require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testBlob = function(test) {
	compareResourceEOE(test, "documents/blob.pec");
};

exports.testDeepItem = function(test) {
	compareResourceEOE(test, "documents/deepItem.pec");
};

exports.testDeepMember = function(test) {
	compareResourceEOE(test, "documents/deepMember.pec");
};

exports.testItem = function(test) {
	compareResourceEOE(test, "documents/item.pec");
};

exports.testLiteral = function(test) {
	compareResourceEOE(test, "documents/literal.pec");
};

exports.testMember = function(test) {
	compareResourceEOE(test, "documents/member.pec");
};

exports.testNamedItem = function(test) {
	compareResourceEOE(test, "documents/namedItem.pec");
};

