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
	loadDependency("console");
	loadDependency("core");
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedBuffer = function(test) {
	runInterpretedTests(test, "console/buffer.pec");
};

exports.testTranspiledBuffer = function(test) {
	runTranspiledTests(test, "console/buffer.pec");
};

exports.testInterpretedPrint = function(test) {
	runInterpretedTests(test, "console/print.pec");
};

exports.testTranspiledPrint = function(test) {
	runTranspiledTests(test, "console/print.pec");
};

