require("../../../../../JavaScript-Core/src/exploded.js");
var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTests;

exports.setUp = function(done) {
	Out.init();
	BaseParserTest.coreContext = null;
	loadDependency("web");
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testEvents = function(test) {
	runTests(test, "web/events.pec");
};

exports.testReact = function(test) {
	runTests(test, "web/react.pec");
};

exports.testUtils = function(test) {
	runTests(test, "web/utils.pec");
};

