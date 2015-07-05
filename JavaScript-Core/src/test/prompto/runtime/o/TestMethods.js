// generated: 2015-07-05T23:01:02.122
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
	checkOutput(test, "methods/anonymous.poc");
};

exports.testAttribute = function(test) {
	checkOutput(test, "methods/attribute.poc");
};

exports.testDefault = function(test) {
	checkOutput(test, "methods/default.poc");
};

exports.testE_as_e_bug = function(test) {
	checkOutput(test, "methods/e_as_e_bug.poc");
};

exports.testExpressionWith = function(test) {
	checkOutput(test, "methods/expressionWith.poc");
};

exports.testImplicit = function(test) {
	checkOutput(test, "methods/implicit.poc");
};

exports.testMember = function(test) {
	checkOutput(test, "methods/member.poc");
};

exports.testPolymorphic_abstract = function(test) {
	checkOutput(test, "methods/polymorphic_abstract.poc");
};

exports.testPolymorphic_implicit = function(test) {
	checkOutput(test, "methods/polymorphic_implicit.poc");
};

exports.testPolymorphic_named = function(test) {
	checkOutput(test, "methods/polymorphic_named.poc");
};

exports.testPolymorphic_runtime = function(test) {
	checkOutput(test, "methods/polymorphic_runtime.poc");
};

exports.testSpecified = function(test) {
	checkOutput(test, "methods/specified.poc");
};

