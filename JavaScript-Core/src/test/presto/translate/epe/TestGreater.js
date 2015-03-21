require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testGtCharacter = function(test) {
	compareResourceEPE(test, "greater/gtCharacter.e");
};

exports.testGtDate = function(test) {
	compareResourceEPE(test, "greater/gtDate.e");
};

exports.testGtDateTime = function(test) {
	compareResourceEPE(test, "greater/gtDateTime.e");
};

exports.testGtDecimal = function(test) {
	compareResourceEPE(test, "greater/gtDecimal.e");
};

exports.testGteCharacter = function(test) {
	compareResourceEPE(test, "greater/gteCharacter.e");
};

exports.testGteDate = function(test) {
	compareResourceEPE(test, "greater/gteDate.e");
};

exports.testGteDateTime = function(test) {
	compareResourceEPE(test, "greater/gteDateTime.e");
};

exports.testGteDecimal = function(test) {
	compareResourceEPE(test, "greater/gteDecimal.e");
};

exports.testGteInteger = function(test) {
	compareResourceEPE(test, "greater/gteInteger.e");
};

exports.testGteText = function(test) {
	compareResourceEPE(test, "greater/gteText.e");
};

exports.testGteTime = function(test) {
	compareResourceEPE(test, "greater/gteTime.e");
};

exports.testGtInteger = function(test) {
	compareResourceEPE(test, "greater/gtInteger.e");
};

exports.testGtText = function(test) {
	compareResourceEPE(test, "greater/gtText.e");
};

exports.testGtTime = function(test) {
	compareResourceEPE(test, "greater/gtTime.e");
};

