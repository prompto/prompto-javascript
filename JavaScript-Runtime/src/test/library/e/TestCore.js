require("../../../../../JavaScript-Core/src/exploded.js");
var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTests;

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

exports.testAny = function(test) {
	runTests(test, "core/any.pec");
};

exports.testAttribute = function(test) {
	runTests(test, "core/attribute.pec");
};

exports.testAttributes = function(test) {
	runTests(test, "core/attributes.pec");
};

exports.testError = function(test) {
	runTests(test, "core/error.pec");
};

exports.testTime = function(test) {
	runTests(test, "core/time.pec");
};

