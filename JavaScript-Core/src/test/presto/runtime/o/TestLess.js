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

exports.testLtCharacter = function(test) {
	checkOutput(test, "less/ltCharacter.o");
};

exports.testLtDate = function(test) {
	checkOutput(test, "less/ltDate.o");
};

exports.testLtDateTime = function(test) {
	checkOutput(test, "less/ltDateTime.o");
};

exports.testLtDecimal = function(test) {
	checkOutput(test, "less/ltDecimal.o");
};

exports.testLteCharacter = function(test) {
	checkOutput(test, "less/lteCharacter.o");
};

exports.testLteDate = function(test) {
	checkOutput(test, "less/lteDate.o");
};

exports.testLteDateTime = function(test) {
	checkOutput(test, "less/lteDateTime.o");
};

exports.testLteDecimal = function(test) {
	checkOutput(test, "less/lteDecimal.o");
};

exports.testLteInteger = function(test) {
	checkOutput(test, "less/lteInteger.o");
};

exports.testLteText = function(test) {
	checkOutput(test, "less/lteText.o");
};

exports.testLteTime = function(test) {
	checkOutput(test, "less/lteTime.o");
};

exports.testLtInteger = function(test) {
	checkOutput(test, "less/ltInteger.o");
};

exports.testLtText = function(test) {
	checkOutput(test, "less/ltText.o");
};

exports.testLtTime = function(test) {
	checkOutput(test, "less/ltTime.o");
};

