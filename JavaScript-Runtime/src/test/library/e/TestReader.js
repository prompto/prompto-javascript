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
	loadDependency("reader");
	loadDependency("core");
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedJson = function(test) {
	runInterpretedTests(test, "reader/json.pec");
};

exports.testTranspiledJson = function(test) {
	runTranspiledTests(test, "reader/json.pec");
};

exports.testInterpretedReader = function(test) {
	runInterpretedTests(test, "reader/reader.pec");
};

exports.testTranspiledReader = function(test) {
	runTranspiledTests(test, "reader/reader.pec");
};

