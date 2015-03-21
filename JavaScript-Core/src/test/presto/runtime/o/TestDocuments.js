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
	checkOutput(test, "documents/deepItem.o");
};

exports.testDeepVariable = function(test) {
	checkOutput(test, "documents/deepVariable.o");
};

exports.testItem = function(test) {
	checkOutput(test, "documents/item.o");
};

exports.testVariable = function(test) {
	checkOutput(test, "documents/variable.o");
};

