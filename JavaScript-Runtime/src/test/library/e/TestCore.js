require("../../../../../JavaScript-Core/src/exploded.js");
var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runInterpretedTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runInterpretedTests;
var runTranspiledTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTranspiledTests;

exports.setUp = function(done) {
	Out.init();
	BaseParserTest.coreContext = null;
	loadDependency("core");
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAny = function(test) {
	runInterpretedTests(test, "core/any.pec");
};

exports.testTranspiledAny = function(test) {
	runTranspiledTests(test, "core/any.pec");
};

exports.testInterpretedAttribute = function(test) {
	runInterpretedTests(test, "core/attribute.pec");
};
/*
exports.testTranspiledAttribute = function(test) {
	runTranspiledTests(test, "core/attribute.pec");
};
*/
exports.testInterpretedAttributes = function(test) {
	runInterpretedTests(test, "core/attributes.pec");
};

exports.testTranspiledAttributes = function(test) {
	runTranspiledTests(test, "core/attributes.pec");
};

exports.testInterpretedCloud = function(test) {
	runInterpretedTests(test, "core/cloud.pec");
};

exports.testTranspiledCloud = function(test) {
	runTranspiledTests(test, "core/cloud.pec");
};

exports.testInterpretedError = function(test) {
	runInterpretedTests(test, "core/error.pec");
};

exports.testTranspiledError = function(test) {
	runTranspiledTests(test, "core/error.pec");
};

exports.testInterpretedMath = function(test) {
	runInterpretedTests(test, "core/math.pec");
};

exports.testTranspiledMath = function(test) {
	runTranspiledTests(test, "core/math.pec");
};

exports.testInterpretedParse = function(test) {
	runInterpretedTests(test, "core/parse.pec");
};

exports.testTranspiledParse = function(test) {
	runTranspiledTests(test, "core/parse.pec");
};

exports.testInterpretedTime = function(test) {
	runInterpretedTests(test, "core/time.pec");
};

exports.testTranspiledTime = function(test) {
	runTranspiledTests(test, "core/time.pec");
};

exports.testInterpretedUtils = function(test) {
	runInterpretedTests(test, "core/utils.pec");
};

exports.testTranspiledUtils = function(test) {
	runTranspiledTests(test, "core/utils.pec");
};

