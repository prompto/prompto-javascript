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
	checkOutput(test, "greater/gtCharacter.e");
};

exports.testGtDate = function(test) {
	checkOutput(test, "greater/gtDate.e");
};

exports.testGtDateTime = function(test) {
	checkOutput(test, "greater/gtDateTime.e");
};

exports.testGtDecimal = function(test) {
	checkOutput(test, "greater/gtDecimal.e");
};

exports.testGteCharacter = function(test) {
	checkOutput(test, "greater/gteCharacter.e");
};

exports.testGteDate = function(test) {
	checkOutput(test, "greater/gteDate.e");
};

exports.testGteDateTime = function(test) {
	checkOutput(test, "greater/gteDateTime.e");
};

exports.testGteDecimal = function(test) {
	checkOutput(test, "greater/gteDecimal.e");
};

exports.testGteInteger = function(test) {
	checkOutput(test, "greater/gteInteger.e");
};

exports.testGteText = function(test) {
	checkOutput(test, "greater/gteText.e");
};

exports.testGteTime = function(test) {
	checkOutput(test, "greater/gteTime.e");
};

exports.testGtInteger = function(test) {
	checkOutput(test, "greater/gtInteger.e");
};

exports.testGtText = function(test) {
	checkOutput(test, "greater/gtText.e");
};

exports.testGtTime = function(test) {
	checkOutput(test, "greater/gtTime.e");
};

