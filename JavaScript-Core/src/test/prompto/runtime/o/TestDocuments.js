// generated: 2015-07-05T23:01:02.039
require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testDeepItem = function(test) {
	checkOutput(test, "documents/deepItem.poc");
};

exports.testDeepVariable = function(test) {
	checkOutput(test, "documents/deepVariable.poc");
};

exports.testItem = function(test) {
	checkOutput(test, "documents/item.poc");
};

exports.testVariable = function(test) {
	checkOutput(test, "documents/variable.poc");
};

