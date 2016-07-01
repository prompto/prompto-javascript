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
	checkOutput(test, "methods/anonymous.pec");
};

exports.testAttribute = function(test) {
	checkOutput(test, "methods/attribute.pec");
};

exports.testDefault = function(test) {
	checkOutput(test, "methods/default.pec");
};

exports.testE_as_e_bug = function(test) {
	checkOutput(test, "methods/e_as_e_bug.pec");
};

exports.testExplicit = function(test) {
	checkOutput(test, "methods/explicit.pec");
};

exports.testExpressionWith = function(test) {
	checkOutput(test, "methods/expressionWith.pec");
};

exports.testExtended = function(test) {
	checkOutput(test, "methods/extended.pec");
};

exports.testImplicit = function(test) {
	checkOutput(test, "methods/implicit.pec");
};

exports.testMember = function(test) {
	checkOutput(test, "methods/member.pec");
};

exports.testMemberCall = function(test) {
	checkOutput(test, "methods/memberCall.pec");
};

exports.testPolymorphic_abstract = function(test) {
	checkOutput(test, "methods/polymorphic_abstract.pec");
};

exports.testPolymorphic_implicit = function(test) {
	checkOutput(test, "methods/polymorphic_implicit.pec");
};

exports.testPolymorphic_named = function(test) {
	checkOutput(test, "methods/polymorphic_named.pec");
};

exports.testPolymorphic_runtime = function(test) {
	checkOutput(test, "methods/polymorphic_runtime.pec");
};

exports.testSpecified = function(test) {
	checkOutput(test, "methods/specified.pec");
};

