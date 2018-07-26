require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAnonymous = function(test) {
	checkInterpretedOutput(test, "methods/anonymous.pec");
};

exports.testTranspiledAnonymous = function(test) {
	checkTranspiledOutput(test, "methods/anonymous.pec");
};

exports.testInterpretedAttribute = function(test) {
	checkInterpretedOutput(test, "methods/attribute.pec");
};

exports.testTranspiledAttribute = function(test) {
	checkTranspiledOutput(test, "methods/attribute.pec");
};

exports.testInterpretedDefault = function(test) {
	checkInterpretedOutput(test, "methods/default.pec");
};

exports.testTranspiledDefault = function(test) {
	checkTranspiledOutput(test, "methods/default.pec");
};

exports.testInterpretedE_as_e_bug = function(test) {
	checkInterpretedOutput(test, "methods/e_as_e_bug.pec");
};

exports.testTranspiledE_as_e_bug = function(test) {
	checkTranspiledOutput(test, "methods/e_as_e_bug.pec");
};

exports.testInterpretedExplicit = function(test) {
	checkInterpretedOutput(test, "methods/explicit.pec");
};

exports.testTranspiledExplicit = function(test) {
	checkTranspiledOutput(test, "methods/explicit.pec");
};

exports.testInterpretedExpressionWith = function(test) {
	checkInterpretedOutput(test, "methods/expressionWith.pec");
};

exports.testTranspiledExpressionWith = function(test) {
	checkTranspiledOutput(test, "methods/expressionWith.pec");
};

exports.testInterpretedExtended = function(test) {
	checkInterpretedOutput(test, "methods/extended.pec");
};

exports.testTranspiledExtended = function(test) {
	checkTranspiledOutput(test, "methods/extended.pec");
};

exports.testInterpretedHomonym = function(test) {
	checkInterpretedOutput(test, "methods/homonym.pec");
};

exports.testTranspiledHomonym = function(test) {
	checkTranspiledOutput(test, "methods/homonym.pec");
};

exports.testInterpretedImplicitAnd = function(test) {
	checkInterpretedOutput(test, "methods/implicitAnd.pec");
};

exports.testTranspiledImplicitAnd = function(test) {
	checkTranspiledOutput(test, "methods/implicitAnd.pec");
};

exports.testInterpretedImplicitMember = function(test) {
	checkInterpretedOutput(test, "methods/implicitMember.pec");
};

exports.testTranspiledImplicitMember = function(test) {
	checkTranspiledOutput(test, "methods/implicitMember.pec");
};

exports.testInterpretedMember = function(test) {
	checkInterpretedOutput(test, "methods/member.pec");
};

exports.testTranspiledMember = function(test) {
	checkTranspiledOutput(test, "methods/member.pec");
};

exports.testInterpretedMemberCall = function(test) {
	checkInterpretedOutput(test, "methods/memberCall.pec");
};

exports.testTranspiledMemberCall = function(test) {
	checkTranspiledOutput(test, "methods/memberCall.pec");
};

exports.testInterpretedOverride = function(test) {
	checkInterpretedOutput(test, "methods/override.pec");
};

exports.testTranspiledOverride = function(test) {
	checkTranspiledOutput(test, "methods/override.pec");
};

exports.testInterpretedPolymorphic_abstract = function(test) {
	checkInterpretedOutput(test, "methods/polymorphic_abstract.pec");
};

exports.testTranspiledPolymorphic_abstract = function(test) {
	checkTranspiledOutput(test, "methods/polymorphic_abstract.pec");
};

exports.testInterpretedPolymorphic_implicit = function(test) {
	checkInterpretedOutput(test, "methods/polymorphic_implicit.pec");
};

exports.testTranspiledPolymorphic_implicit = function(test) {
	checkTranspiledOutput(test, "methods/polymorphic_implicit.pec");
};

exports.testInterpretedPolymorphic_named = function(test) {
	checkInterpretedOutput(test, "methods/polymorphic_named.pec");
};

exports.testTranspiledPolymorphic_named = function(test) {
	checkTranspiledOutput(test, "methods/polymorphic_named.pec");
};

exports.testInterpretedPolymorphic_runtime = function(test) {
	checkInterpretedOutput(test, "methods/polymorphic_runtime.pec");
};

exports.testTranspiledPolymorphic_runtime = function(test) {
	checkTranspiledOutput(test, "methods/polymorphic_runtime.pec");
};

exports.testInterpretedSpecified = function(test) {
	checkInterpretedOutput(test, "methods/specified.pec");
};

exports.testTranspiledSpecified = function(test) {
	checkTranspiledOutput(test, "methods/specified.pec");
};

