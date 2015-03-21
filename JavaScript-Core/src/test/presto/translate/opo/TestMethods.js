require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testAnonymous = function(test) {
	compareResourceOPO(test, "methods/anonymous.o");
};

exports.testAttribute = function(test) {
	compareResourceOPO(test, "methods/attribute.o");
};

exports.testDefault = function(test) {
	compareResourceOPO(test, "methods/default.o");
};

exports.testE_as_e_bug = function(test) {
	compareResourceOPO(test, "methods/e_as_e_bug.o");
};

exports.testExpressionWith = function(test) {
	compareResourceOPO(test, "methods/expressionWith.o");
};

exports.testImplicit = function(test) {
	compareResourceOPO(test, "methods/implicit.o");
};

exports.testMember = function(test) {
	compareResourceOPO(test, "methods/member.o");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceOPO(test, "methods/polymorphic_abstract.o");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceOPO(test, "methods/polymorphic_implicit.o");
};

exports.testPolymorphic_named = function(test) {
	compareResourceOPO(test, "methods/polymorphic_named.o");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceOPO(test, "methods/polymorphic_runtime.o");
};

exports.testReturn = function(test) {
	compareResourceOPO(test, "methods/return.o");
};

exports.testSpecified = function(test) {
	compareResourceOPO(test, "methods/specified.o");
};

