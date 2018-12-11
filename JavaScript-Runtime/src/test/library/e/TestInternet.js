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
	loadDependency("internet");
	loadDependency("console");
	loadDependency("core");
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedHtml = function(test) {
	runInterpretedTests(test, "internet/html.pec");
};

exports.testTranspiledHtml = function(test) {
	runTranspiledTests(test, "internet/html.pec");
};

exports.testInterpretedUrl = function(test) {
	runInterpretedTests(test, "internet/url.pec");
};

exports.testTranspiledUrl = function(test) {
	runTranspiledTests(test, "internet/url.pec");
};

