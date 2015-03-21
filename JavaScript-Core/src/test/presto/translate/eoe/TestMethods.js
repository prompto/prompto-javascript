require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAnonymous = function(test) {
	compareResourceEOE(test, "methods/anonymous.e");
};

exports.testAttribute = function(test) {
	compareResourceEOE(test, "methods/attribute.e");
};

exports.testDefault = function(test) {
	compareResourceEOE(test, "methods/default.e");
};

exports.testE_as_e_bug = function(test) {
	compareResourceEOE(test, "methods/e_as_e_bug.e");
};

exports.testExpressionWith = function(test) {
	compareResourceEOE(test, "methods/expressionWith.e");
};

exports.testImplicit = function(test) {
	compareResourceEOE(test, "methods/implicit.e");
};

exports.testMember = function(test) {
	compareResourceEOE(test, "methods/member.e");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceEOE(test, "methods/polymorphic_abstract.e");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceEOE(test, "methods/polymorphic_implicit.e");
};

exports.testPolymorphic_named = function(test) {
	compareResourceEOE(test, "methods/polymorphic_named.e");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceEOE(test, "methods/polymorphic_runtime.e");
};

exports.testReturn = function(test) {
	compareResourceEOE(test, "methods/return.e");
};

exports.testSpecified = function(test) {
	compareResourceEOE(test, "methods/specified.e");
};

