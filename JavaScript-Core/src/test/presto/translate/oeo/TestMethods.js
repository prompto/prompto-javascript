require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAnonymous = function(test) {
	compareResourceOEO(test, "methods/anonymous.o");
};

exports.testAttribute = function(test) {
	compareResourceOEO(test, "methods/attribute.o");
};

exports.testDefault = function(test) {
	compareResourceOEO(test, "methods/default.o");
};

exports.testE_as_e_bug = function(test) {
	compareResourceOEO(test, "methods/e_as_e_bug.o");
};

exports.testExpressionWith = function(test) {
	compareResourceOEO(test, "methods/expressionWith.o");
};

exports.testImplicit = function(test) {
	compareResourceOEO(test, "methods/implicit.o");
};

exports.testMember = function(test) {
	compareResourceOEO(test, "methods/member.o");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceOEO(test, "methods/polymorphic_abstract.o");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceOEO(test, "methods/polymorphic_implicit.o");
};

exports.testPolymorphic_named = function(test) {
	compareResourceOEO(test, "methods/polymorphic_named.o");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceOEO(test, "methods/polymorphic_runtime.o");
};

exports.testReturn = function(test) {
	compareResourceOEO(test, "methods/return.o");
};

exports.testSpecified = function(test) {
	compareResourceOEO(test, "methods/specified.o");
};

