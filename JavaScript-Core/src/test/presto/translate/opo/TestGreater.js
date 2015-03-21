require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testGtCharacter = function(test) {
	compareResourceOPO(test, "greater/gtCharacter.o");
};

exports.testGtDate = function(test) {
	compareResourceOPO(test, "greater/gtDate.o");
};

exports.testGtDateTime = function(test) {
	compareResourceOPO(test, "greater/gtDateTime.o");
};

exports.testGtDecimal = function(test) {
	compareResourceOPO(test, "greater/gtDecimal.o");
};

exports.testGteCharacter = function(test) {
	compareResourceOPO(test, "greater/gteCharacter.o");
};

exports.testGteDate = function(test) {
	compareResourceOPO(test, "greater/gteDate.o");
};

exports.testGteDateTime = function(test) {
	compareResourceOPO(test, "greater/gteDateTime.o");
};

exports.testGteDecimal = function(test) {
	compareResourceOPO(test, "greater/gteDecimal.o");
};

exports.testGteInteger = function(test) {
	compareResourceOPO(test, "greater/gteInteger.o");
};

exports.testGteText = function(test) {
	compareResourceOPO(test, "greater/gteText.o");
};

exports.testGteTime = function(test) {
	compareResourceOPO(test, "greater/gteTime.o");
};

exports.testGtInteger = function(test) {
	compareResourceOPO(test, "greater/gtInteger.o");
};

exports.testGtText = function(test) {
	compareResourceOPO(test, "greater/gtText.o");
};

exports.testGtTime = function(test) {
	compareResourceOPO(test, "greater/gtTime.o");
};

