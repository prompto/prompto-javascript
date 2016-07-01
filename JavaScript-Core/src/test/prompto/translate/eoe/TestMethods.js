require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAnonymous = function(test) {
	compareResourceEOE(test, "methods/anonymous.pec");
};

exports.testAttribute = function(test) {
	compareResourceEOE(test, "methods/attribute.pec");
};

exports.testDefault = function(test) {
	compareResourceEOE(test, "methods/default.pec");
};

exports.testE_as_e_bug = function(test) {
	compareResourceEOE(test, "methods/e_as_e_bug.pec");
};

exports.testExplicit = function(test) {
	compareResourceEOE(test, "methods/explicit.pec");
};

exports.testExpressionWith = function(test) {
	compareResourceEOE(test, "methods/expressionWith.pec");
};

exports.testExtended = function(test) {
	compareResourceEOE(test, "methods/extended.pec");
};

exports.testImplicit = function(test) {
	compareResourceEOE(test, "methods/implicit.pec");
};

exports.testMember = function(test) {
	compareResourceEOE(test, "methods/member.pec");
};

exports.testMemberCall = function(test) {
	compareResourceEOE(test, "methods/memberCall.pec");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceEOE(test, "methods/polymorphic_abstract.pec");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceEOE(test, "methods/polymorphic_implicit.pec");
};

exports.testPolymorphic_named = function(test) {
	compareResourceEOE(test, "methods/polymorphic_named.pec");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceEOE(test, "methods/polymorphic_runtime.pec");
};

exports.testReturn = function(test) {
	compareResourceEOE(test, "methods/return.pec");
};

exports.testSpecified = function(test) {
	compareResourceEOE(test, "methods/specified.pec");
};

