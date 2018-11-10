require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAnonymous = function(test) {
	checkInterpretedOutput(test, "methods/anonymous.poc");
};

exports.testTranspiledAnonymous = function(test) {
	checkTranspiledOutput(test, "methods/anonymous.poc");
};

exports.testInterpretedAttribute = function(test) {
	checkInterpretedOutput(test, "methods/attribute.poc");
};

exports.testTranspiledAttribute = function(test) {
	checkTranspiledOutput(test, "methods/attribute.poc");
};

exports.testInterpretedDefault = function(test) {
	checkInterpretedOutput(test, "methods/default.poc");
};

exports.testTranspiledDefault = function(test) {
	checkTranspiledOutput(test, "methods/default.poc");
};

exports.testInterpretedE_as_e_bug = function(test) {
	checkInterpretedOutput(test, "methods/e_as_e_bug.poc");
};

exports.testTranspiledE_as_e_bug = function(test) {
	checkTranspiledOutput(test, "methods/e_as_e_bug.poc");
};

exports.testInterpretedExplicit = function(test) {
	checkInterpretedOutput(test, "methods/explicit.poc");
};

exports.testTranspiledExplicit = function(test) {
	checkTranspiledOutput(test, "methods/explicit.poc");
};

exports.testInterpretedExplicitMember = function(test) {
	checkInterpretedOutput(test, "methods/explicitMember.poc");
};

exports.testTranspiledExplicitMember = function(test) {
	checkTranspiledOutput(test, "methods/explicitMember.poc");
};

exports.testInterpretedExpressionWith = function(test) {
	checkInterpretedOutput(test, "methods/expressionWith.poc");
};

exports.testTranspiledExpressionWith = function(test) {
	checkTranspiledOutput(test, "methods/expressionWith.poc");
};

exports.testInterpretedExtended = function(test) {
	checkInterpretedOutput(test, "methods/extended.poc");
};

exports.testTranspiledExtended = function(test) {
	checkTranspiledOutput(test, "methods/extended.poc");
};

exports.testInterpretedImplicitMember = function(test) {
	checkInterpretedOutput(test, "methods/implicitMember.poc");
};

exports.testTranspiledImplicitMember = function(test) {
	checkTranspiledOutput(test, "methods/implicitMember.poc");
};

exports.testInterpretedMember = function(test) {
	checkInterpretedOutput(test, "methods/member.poc");
};

exports.testTranspiledMember = function(test) {
	checkTranspiledOutput(test, "methods/member.poc");
};

exports.testInterpretedOverride = function(test) {
	checkInterpretedOutput(test, "methods/override.poc");
};

exports.testTranspiledOverride = function(test) {
	checkTranspiledOutput(test, "methods/override.poc");
};

exports.testInterpretedPolymorphic_abstract = function(test) {
	checkInterpretedOutput(test, "methods/polymorphic_abstract.poc");
};

exports.testTranspiledPolymorphic_abstract = function(test) {
	checkTranspiledOutput(test, "methods/polymorphic_abstract.poc");
};

exports.testInterpretedPolymorphic_implicit = function(test) {
	checkInterpretedOutput(test, "methods/polymorphic_implicit.poc");
};

exports.testTranspiledPolymorphic_implicit = function(test) {
	checkTranspiledOutput(test, "methods/polymorphic_implicit.poc");
};

exports.testInterpretedPolymorphic_named = function(test) {
	checkInterpretedOutput(test, "methods/polymorphic_named.poc");
};

exports.testTranspiledPolymorphic_named = function(test) {
	checkTranspiledOutput(test, "methods/polymorphic_named.poc");
};

exports.testInterpretedPolymorphic_runtime = function(test) {
	checkInterpretedOutput(test, "methods/polymorphic_runtime.poc");
};

exports.testTranspiledPolymorphic_runtime = function(test) {
	checkTranspiledOutput(test, "methods/polymorphic_runtime.poc");
};

exports.testInterpretedSpecified = function(test) {
	checkInterpretedOutput(test, "methods/specified.poc");
};

exports.testTranspiledSpecified = function(test) {
	checkTranspiledOutput(test, "methods/specified.poc");
};

exports.testInterpretedVoidAsync = function(test) {
	checkInterpretedOutput(test, "methods/voidAsync.poc");
};

exports.testTranspiledVoidAsync = function(test) {
	checkTranspiledOutput(test, "methods/voidAsync.poc");
};

