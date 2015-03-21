require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testAnonymous = function(test) {
	compareResourceEPE(test, "methods/anonymous.e");
};

exports.testAttribute = function(test) {
	compareResourceEPE(test, "methods/attribute.e");
};

exports.testDefault = function(test) {
	compareResourceEPE(test, "methods/default.e");
};

exports.testE_as_e_bug = function(test) {
	compareResourceEPE(test, "methods/e_as_e_bug.e");
};

exports.testExpressionWith = function(test) {
	compareResourceEPE(test, "methods/expressionWith.e");
};

exports.testImplicit = function(test) {
	compareResourceEPE(test, "methods/implicit.e");
};

exports.testMember = function(test) {
	compareResourceEPE(test, "methods/member.e");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceEPE(test, "methods/polymorphic_abstract.e");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceEPE(test, "methods/polymorphic_implicit.e");
};

exports.testPolymorphic_named = function(test) {
	compareResourceEPE(test, "methods/polymorphic_named.e");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceEPE(test, "methods/polymorphic_runtime.e");
};

exports.testReturn = function(test) {
	compareResourceEPE(test, "methods/return.e");
};

exports.testSpecified = function(test) {
	compareResourceEPE(test, "methods/specified.e");
};

