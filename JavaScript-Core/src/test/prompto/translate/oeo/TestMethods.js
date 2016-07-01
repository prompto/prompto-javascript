require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAnonymous = function(test) {
	compareResourceOEO(test, "methods/anonymous.poc");
};

exports.testAttribute = function(test) {
	compareResourceOEO(test, "methods/attribute.poc");
};

exports.testDefault = function(test) {
	compareResourceOEO(test, "methods/default.poc");
};

exports.testE_as_e_bug = function(test) {
	compareResourceOEO(test, "methods/e_as_e_bug.poc");
};

exports.testExpressionWith = function(test) {
	compareResourceOEO(test, "methods/expressionWith.poc");
};

exports.testExtended = function(test) {
	compareResourceOEO(test, "methods/extended.poc");
};

exports.testImplicit = function(test) {
	compareResourceOEO(test, "methods/implicit.poc");
};

exports.testMember = function(test) {
	compareResourceOEO(test, "methods/member.poc");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceOEO(test, "methods/polymorphic_abstract.poc");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceOEO(test, "methods/polymorphic_implicit.poc");
};

exports.testPolymorphic_named = function(test) {
	compareResourceOEO(test, "methods/polymorphic_named.poc");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceOEO(test, "methods/polymorphic_runtime.poc");
};

exports.testReturn = function(test) {
	compareResourceOEO(test, "methods/return.poc");
};

exports.testSpecified = function(test) {
	compareResourceOEO(test, "methods/specified.poc");
};

