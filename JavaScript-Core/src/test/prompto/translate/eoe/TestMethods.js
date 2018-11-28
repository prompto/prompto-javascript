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

exports.testEmpty = function(test) {
	compareResourceEOE(test, "methods/empty.pec");
};

exports.testExplicit = function(test) {
	compareResourceEOE(test, "methods/explicit.pec");
};

exports.testExplicitMember = function(test) {
	compareResourceEOE(test, "methods/explicitMember.pec");
};

exports.testExpressionMember = function(test) {
	compareResourceEOE(test, "methods/expressionMember.pec");
};

exports.testExpressionWith = function(test) {
	compareResourceEOE(test, "methods/expressionWith.pec");
};

exports.testExtended = function(test) {
	compareResourceEOE(test, "methods/extended.pec");
};

exports.testGlobal = function(test) {
	compareResourceEOE(test, "methods/global.pec");
};

exports.testHomonym = function(test) {
	compareResourceEOE(test, "methods/homonym.pec");
};

exports.testImplicitAnd = function(test) {
	compareResourceEOE(test, "methods/implicitAnd.pec");
};

exports.testImplicitMember = function(test) {
	compareResourceEOE(test, "methods/implicitMember.pec");
};

exports.testMember = function(test) {
	compareResourceEOE(test, "methods/member.pec");
};

exports.testMemberCall = function(test) {
	compareResourceEOE(test, "methods/memberCall.pec");
};

exports.testOverride = function(test) {
	compareResourceEOE(test, "methods/override.pec");
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

exports.testTextAsync = function(test) {
	compareResourceEOE(test, "methods/textAsync.pec");
};

exports.testVoidAsync = function(test) {
	compareResourceEOE(test, "methods/voidAsync.pec");
};

