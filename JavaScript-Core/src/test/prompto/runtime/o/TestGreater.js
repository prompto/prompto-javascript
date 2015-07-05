// generated: 2015-07-05T23:01:02.078
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

exports.testGtCharacter = function(test) {
	checkOutput(test, "greater/gtCharacter.poc");
};

exports.testGtDate = function(test) {
	checkOutput(test, "greater/gtDate.poc");
};

exports.testGtDateTime = function(test) {
	checkOutput(test, "greater/gtDateTime.poc");
};

exports.testGtDecimal = function(test) {
	checkOutput(test, "greater/gtDecimal.poc");
};

exports.testGteCharacter = function(test) {
	checkOutput(test, "greater/gteCharacter.poc");
};

exports.testGteDate = function(test) {
	checkOutput(test, "greater/gteDate.poc");
};

exports.testGteDateTime = function(test) {
	checkOutput(test, "greater/gteDateTime.poc");
};

exports.testGteDecimal = function(test) {
	checkOutput(test, "greater/gteDecimal.poc");
};

exports.testGteInteger = function(test) {
	checkOutput(test, "greater/gteInteger.poc");
};

exports.testGteText = function(test) {
	checkOutput(test, "greater/gteText.poc");
};

exports.testGteTime = function(test) {
	checkOutput(test, "greater/gteTime.poc");
};

exports.testGtInteger = function(test) {
	checkOutput(test, "greater/gtInteger.poc");
};

exports.testGtText = function(test) {
	checkOutput(test, "greater/gtText.poc");
};

exports.testGtTime = function(test) {
	checkOutput(test, "greater/gtTime.poc");
};

