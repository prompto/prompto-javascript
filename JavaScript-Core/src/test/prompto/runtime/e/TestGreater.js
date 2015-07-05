// generated: 2015-07-05T23:01:02.075
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

exports.testGtCharacter = function(test) {
	checkOutput(test, "greater/gtCharacter.pec");
};

exports.testGtDate = function(test) {
	checkOutput(test, "greater/gtDate.pec");
};

exports.testGtDateTime = function(test) {
	checkOutput(test, "greater/gtDateTime.pec");
};

exports.testGtDecimal = function(test) {
	checkOutput(test, "greater/gtDecimal.pec");
};

exports.testGteCharacter = function(test) {
	checkOutput(test, "greater/gteCharacter.pec");
};

exports.testGteDate = function(test) {
	checkOutput(test, "greater/gteDate.pec");
};

exports.testGteDateTime = function(test) {
	checkOutput(test, "greater/gteDateTime.pec");
};

exports.testGteDecimal = function(test) {
	checkOutput(test, "greater/gteDecimal.pec");
};

exports.testGteInteger = function(test) {
	checkOutput(test, "greater/gteInteger.pec");
};

exports.testGteText = function(test) {
	checkOutput(test, "greater/gteText.pec");
};

exports.testGteTime = function(test) {
	checkOutput(test, "greater/gteTime.pec");
};

exports.testGtInteger = function(test) {
	checkOutput(test, "greater/gtInteger.pec");
};

exports.testGtText = function(test) {
	checkOutput(test, "greater/gtText.pec");
};

exports.testGtTime = function(test) {
	checkOutput(test, "greater/gtTime.pec");
};

