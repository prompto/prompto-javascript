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
	checkOutput(test, "greater/gtCharacter.o");
};

exports.testGtDate = function(test) {
	checkOutput(test, "greater/gtDate.o");
};

exports.testGtDateTime = function(test) {
	checkOutput(test, "greater/gtDateTime.o");
};

exports.testGtDecimal = function(test) {
	checkOutput(test, "greater/gtDecimal.o");
};

exports.testGteCharacter = function(test) {
	checkOutput(test, "greater/gteCharacter.o");
};

exports.testGteDate = function(test) {
	checkOutput(test, "greater/gteDate.o");
};

exports.testGteDateTime = function(test) {
	checkOutput(test, "greater/gteDateTime.o");
};

exports.testGteDecimal = function(test) {
	checkOutput(test, "greater/gteDecimal.o");
};

exports.testGteInteger = function(test) {
	checkOutput(test, "greater/gteInteger.o");
};

exports.testGteText = function(test) {
	checkOutput(test, "greater/gteText.o");
};

exports.testGteTime = function(test) {
	checkOutput(test, "greater/gteTime.o");
};

exports.testGtInteger = function(test) {
	checkOutput(test, "greater/gtInteger.o");
};

exports.testGtText = function(test) {
	checkOutput(test, "greater/gtText.o");
};

exports.testGtTime = function(test) {
	checkOutput(test, "greater/gtTime.o");
};

