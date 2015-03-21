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

exports.testDeepItem = function(test) {
	checkOutput(test, "documents/deepItem.e");
};

exports.testDeepVariable = function(test) {
	checkOutput(test, "documents/deepVariable.e");
};

exports.testItem = function(test) {
	checkOutput(test, "documents/item.e");
};

exports.testVariable = function(test) {
	checkOutput(test, "documents/variable.e");
};

