require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAnonymous = function(test) {
	checkOutput(test, "methods/anonymous.o");
};

exports.testAttribute = function(test) {
	checkOutput(test, "methods/attribute.o");
};

exports.testDefault = function(test) {
	checkOutput(test, "methods/default.o");
};

exports.testE_as_e_bug = function(test) {
	checkOutput(test, "methods/e_as_e_bug.o");
};

exports.testExpressionWith = function(test) {
	checkOutput(test, "methods/expressionWith.o");
};

exports.testImplicit = function(test) {
	checkOutput(test, "methods/implicit.o");
};

exports.testMember = function(test) {
	checkOutput(test, "methods/member.o");
};

exports.testPolymorphic_abstract = function(test) {
	checkOutput(test, "methods/polymorphic_abstract.o");
};

exports.testPolymorphic_implicit = function(test) {
	checkOutput(test, "methods/polymorphic_implicit.o");
};

exports.testPolymorphic_named = function(test) {
	checkOutput(test, "methods/polymorphic_named.o");
};

exports.testPolymorphic_runtime = function(test) {
	checkOutput(test, "methods/polymorphic_runtime.o");
};

exports.testSpecified = function(test) {
	checkOutput(test, "methods/specified.o");
};

