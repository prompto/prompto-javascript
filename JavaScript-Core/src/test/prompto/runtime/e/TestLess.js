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
	checkOutput(test, "less/ltCharacter.pec");
};

exports.testLtDate = function(test) {
	checkOutput(test, "less/ltDate.pec");
};

exports.testLtDateTime = function(test) {
	checkOutput(test, "less/ltDateTime.pec");
};

exports.testLtDecimal = function(test) {
	checkOutput(test, "less/ltDecimal.pec");
};

exports.testLteCharacter = function(test) {
	checkOutput(test, "less/lteCharacter.pec");
};

exports.testLteDate = function(test) {
	checkOutput(test, "less/lteDate.pec");
};

exports.testLteDateTime = function(test) {
	checkOutput(test, "less/lteDateTime.pec");
};

exports.testLteDecimal = function(test) {
	checkOutput(test, "less/lteDecimal.pec");
};

exports.testLteInteger = function(test) {
	checkOutput(test, "less/lteInteger.pec");
};

exports.testLteText = function(test) {
	checkOutput(test, "less/lteText.pec");
};

exports.testLteTime = function(test) {
	checkOutput(test, "less/lteTime.pec");
};

exports.testLtInteger = function(test) {
	checkOutput(test, "less/ltInteger.pec");
};

exports.testLtText = function(test) {
	checkOutput(test, "less/ltText.pec");
};

exports.testLtTime = function(test) {
	checkOutput(test, "less/ltTime.pec");
};

exports.testLtVersion = function(test) {
	checkOutput(test, "less/ltVersion.pec");
};

