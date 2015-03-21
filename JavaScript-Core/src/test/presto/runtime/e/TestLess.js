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

exports.testLtCharacter = function(test) {
	checkOutput(test, "less/ltCharacter.e");
};

exports.testLtDate = function(test) {
	checkOutput(test, "less/ltDate.e");
};

exports.testLtDateTime = function(test) {
	checkOutput(test, "less/ltDateTime.e");
};

exports.testLtDecimal = function(test) {
	checkOutput(test, "less/ltDecimal.e");
};

exports.testLteCharacter = function(test) {
	checkOutput(test, "less/lteCharacter.e");
};

exports.testLteDate = function(test) {
	checkOutput(test, "less/lteDate.e");
};

exports.testLteDateTime = function(test) {
	checkOutput(test, "less/lteDateTime.e");
};

exports.testLteDecimal = function(test) {
	checkOutput(test, "less/lteDecimal.e");
};

exports.testLteInteger = function(test) {
	checkOutput(test, "less/lteInteger.e");
};

exports.testLteText = function(test) {
	checkOutput(test, "less/lteText.e");
};

exports.testLteTime = function(test) {
	checkOutput(test, "less/lteTime.e");
};

exports.testLtInteger = function(test) {
	checkOutput(test, "less/ltInteger.e");
};

exports.testLtText = function(test) {
	checkOutput(test, "less/ltText.e");
};

exports.testLtTime = function(test) {
	checkOutput(test, "less/ltTime.e");
};

