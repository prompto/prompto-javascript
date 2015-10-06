// generated: 2015-10-06T23:17:33.362
var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTests;

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

exports.testPrint = function(test) {
	runTests(test, "console/print.pec");
};

