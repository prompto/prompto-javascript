require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testAnonymous = function(test) {
	compareResourceOMO(test, "methods/anonymous.poc");
};

exports.testAttribute = function(test) {
	compareResourceOMO(test, "methods/attribute.poc");
};

exports.testDefault = function(test) {
	compareResourceOMO(test, "methods/default.poc");
};

exports.testE_as_e_bug = function(test) {
	compareResourceOMO(test, "methods/e_as_e_bug.poc");
};

exports.testExplicit = function(test) {
	compareResourceOMO(test, "methods/explicit.poc");
};

exports.testExpressionWith = function(test) {
	compareResourceOMO(test, "methods/expressionWith.poc");
};

exports.testExtended = function(test) {
	compareResourceOMO(test, "methods/extended.poc");
};

exports.testImplicitMember = function(test) {
	compareResourceOMO(test, "methods/implicitMember.poc");
};

exports.testMember = function(test) {
	compareResourceOMO(test, "methods/member.poc");
};

exports.testOverride = function(test) {
	compareResourceOMO(test, "methods/override.poc");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceOMO(test, "methods/polymorphic_abstract.poc");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceOMO(test, "methods/polymorphic_implicit.poc");
};

exports.testPolymorphic_named = function(test) {
	compareResourceOMO(test, "methods/polymorphic_named.poc");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceOMO(test, "methods/polymorphic_runtime.poc");
};

exports.testReturn = function(test) {
	compareResourceOMO(test, "methods/return.poc");
};

exports.testSpecified = function(test) {
	compareResourceOMO(test, "methods/specified.poc");
};

