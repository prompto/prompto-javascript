// generated: 2015-07-05T23:01:02.122
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAnonymous = function(test) {
	compareResourceOSO(test, "methods/anonymous.poc");
};

exports.testAttribute = function(test) {
	compareResourceOSO(test, "methods/attribute.poc");
};

exports.testDefault = function(test) {
	compareResourceOSO(test, "methods/default.poc");
};

exports.testE_as_e_bug = function(test) {
	compareResourceOSO(test, "methods/e_as_e_bug.poc");
};

exports.testExpressionWith = function(test) {
	compareResourceOSO(test, "methods/expressionWith.poc");
};

exports.testImplicit = function(test) {
	compareResourceOSO(test, "methods/implicit.poc");
};

exports.testMember = function(test) {
	compareResourceOSO(test, "methods/member.poc");
};

exports.testPolymorphic_abstract = function(test) {
	compareResourceOSO(test, "methods/polymorphic_abstract.poc");
};

exports.testPolymorphic_implicit = function(test) {
	compareResourceOSO(test, "methods/polymorphic_implicit.poc");
};

exports.testPolymorphic_named = function(test) {
	compareResourceOSO(test, "methods/polymorphic_named.poc");
};

exports.testPolymorphic_runtime = function(test) {
	compareResourceOSO(test, "methods/polymorphic_runtime.poc");
};

exports.testReturn = function(test) {
	compareResourceOSO(test, "methods/return.poc");
};

exports.testSpecified = function(test) {
	compareResourceOSO(test, "methods/specified.poc");
};

