require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAnonymous = function(test) {
	checkOutput(test, "methods/anonymous.e");
};

exports.testAttribute = function(test) {
	checkOutput(test, "methods/attribute.e");
};

exports.testDefault = function(test) {
	checkOutput(test, "methods/default.e");
};

exports.testE_as_e_bug = function(test) {
	checkOutput(test, "methods/e_as_e_bug.e");
};

exports.testExpressionWith = function(test) {
	checkOutput(test, "methods/expressionWith.e");
};

exports.testImplicit = function(test) {
	checkOutput(test, "methods/implicit.e");
};

exports.testMember = function(test) {
	checkOutput(test, "methods/member.e");
};

exports.testPolymorphic_abstract = function(test) {
	checkOutput(test, "methods/polymorphic_abstract.e");
};

exports.testPolymorphic_implicit = function(test) {
	checkOutput(test, "methods/polymorphic_implicit.e");
};

exports.testPolymorphic_named = function(test) {
	checkOutput(test, "methods/polymorphic_named.e");
};

exports.testPolymorphic_runtime = function(test) {
	checkOutput(test, "methods/polymorphic_runtime.e");
};

exports.testSpecified = function(test) {
	checkOutput(test, "methods/specified.e");
};

