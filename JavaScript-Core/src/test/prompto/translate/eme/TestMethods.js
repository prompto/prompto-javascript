require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAnonymous = function(test) {
	compareResourceEME(test, "methods/anonymous.pec");
};

exports.testAttribute = function(test) {
	compareResourceEME(test, "methods/attribute.pec");
};

exports.testDefault = function(test) {
	compareResourceEME(test, "methods/default.pec");
};

exports.testE_as_e_bug = function(test) {
	compareResourceEME(test, "methods/e_as_e_bug.pec");
};

exports.testExplicit = function(test) {
	compareResourceEME(test, "methods/explicit.pec");
};

exports.testExplicitMember = function(test) {
	compareResourceEME(test, "methods/explicitMember.pec");
};

exports.testExpressionMember = function(test) {
	compareResourceEME(test, "methods/expressionMember.pec");
};

exports.testExpressionWith = function(test) {
	compareResourceEME(test, "methods/expressionWith.pec");
};

exports.testExtended = function(test) {
	compareResourceEME(test, "methods/extended.pec");
};

exports.testGlobal = function(test) {
	compareResourceEME(test, "methods/global.pec");
};

exports.testHomonym = function(test) {
	compareResourceEME(test, "methods/homonym.pec");
};

exports.testImplicitAnd = function(test) {
	compareResourceEME(test, "methods/implicitAnd.pec");
};

exports.testImplicitMember = function(test) {
	compareResourceEME(test, "methods/implicitMember.pec");
};

exports.testMember = function(test) {
	compareResourceEME(test, "methods/member.pec");
};

exports.testMemberCall = function(test) {
	compareResourceEME(test, "methods/memberCall.pec");
};

exports.testOverride = function(test) {
	compareResourceEME(test, "methods/override.pec");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceEME(test, "methods/polymorphic_abstract.pec");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceEME(test, "methods/polymorphic_implicit.pec");
};

exports.testPolymorphic_named = function(test) {
	compareResourceEME(test, "methods/polymorphic_named.pec");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceEME(test, "methods/polymorphic_runtime.pec");
};

exports.testReturn = function(test) {
	compareResourceEME(test, "methods/return.pec");
};

exports.testSpecified = function(test) {
	compareResourceEME(test, "methods/specified.pec");
};

exports.testTextAsync = function(test) {
	compareResourceEME(test, "methods/textAsync.pec");
};

exports.testVoidAsync = function(test) {
	compareResourceEME(test, "methods/voidAsync.pec");
};

