require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testGtCharacter = function(test) {
	compareResourceOMO(test, "greater/gtCharacter.poc");
};

exports.testGtDate = function(test) {
	compareResourceOMO(test, "greater/gtDate.poc");
};

exports.testGtDateTime = function(test) {
	compareResourceOMO(test, "greater/gtDateTime.poc");
};

exports.testGtDecimal = function(test) {
	compareResourceOMO(test, "greater/gtDecimal.poc");
};

exports.testGteCharacter = function(test) {
	compareResourceOMO(test, "greater/gteCharacter.poc");
};

exports.testGteDate = function(test) {
	compareResourceOMO(test, "greater/gteDate.poc");
};

exports.testGteDateTime = function(test) {
	compareResourceOMO(test, "greater/gteDateTime.poc");
};

exports.testGteDecimal = function(test) {
	compareResourceOMO(test, "greater/gteDecimal.poc");
};

exports.testGteInteger = function(test) {
	compareResourceOMO(test, "greater/gteInteger.poc");
};

exports.testGteText = function(test) {
	compareResourceOMO(test, "greater/gteText.poc");
};

exports.testGteTime = function(test) {
	compareResourceOMO(test, "greater/gteTime.poc");
};

exports.testGtInteger = function(test) {
	compareResourceOMO(test, "greater/gtInteger.poc");
};

exports.testGtText = function(test) {
	compareResourceOMO(test, "greater/gtText.poc");
};

exports.testGtTime = function(test) {
	compareResourceOMO(test, "greater/gtTime.poc");
};

exports.testGtVersion = function(test) {
	compareResourceOMO(test, "greater/gtVersion.poc");
};

