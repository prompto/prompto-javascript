// generated: 2015-07-05T23:01:02.144
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

exports.testAnyId = function(test) {
	checkOutput(test, "native/anyId.pec");
};

exports.testAnyText = function(test) {
	checkOutput(test, "native/anyText.pec");
};

exports.testAttribute = function(test) {
	checkOutput(test, "native/attribute.pec");
};

exports.testCategory = function(test) {
	checkOutput(test, "native/category.pec");
};

exports.testMethod = function(test) {
	checkOutput(test, "native/method.pec");
};

exports.testPrinter = function(test) {
	checkOutput(test, "native/printer.pec");
};

