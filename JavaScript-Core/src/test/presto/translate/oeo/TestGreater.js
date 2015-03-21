require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testGtCharacter = function(test) {
	compareResourceOEO(test, "greater/gtCharacter.o");
};

exports.testGtDate = function(test) {
	compareResourceOEO(test, "greater/gtDate.o");
};

exports.testGtDateTime = function(test) {
	compareResourceOEO(test, "greater/gtDateTime.o");
};

exports.testGtDecimal = function(test) {
	compareResourceOEO(test, "greater/gtDecimal.o");
};

exports.testGteCharacter = function(test) {
	compareResourceOEO(test, "greater/gteCharacter.o");
};

exports.testGteDate = function(test) {
	compareResourceOEO(test, "greater/gteDate.o");
};

exports.testGteDateTime = function(test) {
	compareResourceOEO(test, "greater/gteDateTime.o");
};

exports.testGteDecimal = function(test) {
	compareResourceOEO(test, "greater/gteDecimal.o");
};

exports.testGteInteger = function(test) {
	compareResourceOEO(test, "greater/gteInteger.o");
};

exports.testGteText = function(test) {
	compareResourceOEO(test, "greater/gteText.o");
};

exports.testGteTime = function(test) {
	compareResourceOEO(test, "greater/gteTime.o");
};

exports.testGtInteger = function(test) {
	compareResourceOEO(test, "greater/gtInteger.o");
};

exports.testGtText = function(test) {
	compareResourceOEO(test, "greater/gtText.o");
};

exports.testGtTime = function(test) {
	compareResourceOEO(test, "greater/gtTime.o");
};

