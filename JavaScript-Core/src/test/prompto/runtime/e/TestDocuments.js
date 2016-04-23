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

exports.testBlob = function(test) {
	checkOutput(test, "documents/blob.pec");
};


exports.testDeepItem = function(test) {
	checkOutput(test, "documents/deepItem.pec");
};

exports.testDeepVariable = function(test) {
	checkOutput(test, "documents/deepVariable.pec");
};

exports.testItem = function(test) {
	checkOutput(test, "documents/item.pec");
};

exports.testVariable = function(test) {
	checkOutput(test, "documents/variable.pec");
};

