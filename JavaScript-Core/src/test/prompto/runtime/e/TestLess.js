require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedLtCharacter = function(test) {
	checkInterpretedOutput(test, "less/ltCharacter.pec");
};

exports.testTranspiledLtCharacter = function(test) {
	checkTranspiledOutput(test, "less/ltCharacter.pec");
};

exports.testInterpretedLtDate = function(test) {
	checkInterpretedOutput(test, "less/ltDate.pec");
};

exports.testTranspiledLtDate = function(test) {
	checkTranspiledOutput(test, "less/ltDate.pec");
};

exports.testInterpretedLtDateTime = function(test) {
	checkInterpretedOutput(test, "less/ltDateTime.pec");
};

exports.testTranspiledLtDateTime = function(test) {
	checkTranspiledOutput(test, "less/ltDateTime.pec");
};

exports.testInterpretedLtDecimal = function(test) {
	checkInterpretedOutput(test, "less/ltDecimal.pec");
};

exports.testTranspiledLtDecimal = function(test) {
	checkTranspiledOutput(test, "less/ltDecimal.pec");
};

exports.testInterpretedLtInteger = function(test) {
	checkInterpretedOutput(test, "less/ltInteger.pec");
};

exports.testTranspiledLtInteger = function(test) {
	checkTranspiledOutput(test, "less/ltInteger.pec");
};

exports.testInterpretedLtText = function(test) {
	checkInterpretedOutput(test, "less/ltText.pec");
};

exports.testTranspiledLtText = function(test) {
	checkTranspiledOutput(test, "less/ltText.pec");
};

exports.testInterpretedLtTime = function(test) {
	checkInterpretedOutput(test, "less/ltTime.pec");
};

exports.testTranspiledLtTime = function(test) {
	checkTranspiledOutput(test, "less/ltTime.pec");
};

exports.testInterpretedLtVersion = function(test) {
	checkInterpretedOutput(test, "less/ltVersion.pec");
};

exports.testTranspiledLtVersion = function(test) {
	checkTranspiledOutput(test, "less/ltVersion.pec");
};

exports.testInterpretedLteCharacter = function(test) {
	checkInterpretedOutput(test, "less/lteCharacter.pec");
};

exports.testTranspiledLteCharacter = function(test) {
	checkTranspiledOutput(test, "less/lteCharacter.pec");
};

exports.testInterpretedLteDate = function(test) {
	checkInterpretedOutput(test, "less/lteDate.pec");
};

exports.testTranspiledLteDate = function(test) {
	checkTranspiledOutput(test, "less/lteDate.pec");
};

exports.testInterpretedLteDateTime = function(test) {
	checkInterpretedOutput(test, "less/lteDateTime.pec");
};

exports.testTranspiledLteDateTime = function(test) {
	checkTranspiledOutput(test, "less/lteDateTime.pec");
};

exports.testInterpretedLteDecimal = function(test) {
	checkInterpretedOutput(test, "less/lteDecimal.pec");
};

exports.testTranspiledLteDecimal = function(test) {
	checkTranspiledOutput(test, "less/lteDecimal.pec");
};

exports.testInterpretedLteInteger = function(test) {
	checkInterpretedOutput(test, "less/lteInteger.pec");
};

exports.testTranspiledLteInteger = function(test) {
	checkTranspiledOutput(test, "less/lteInteger.pec");
};

exports.testInterpretedLteText = function(test) {
	checkInterpretedOutput(test, "less/lteText.pec");
};

exports.testTranspiledLteText = function(test) {
	checkTranspiledOutput(test, "less/lteText.pec");
};

exports.testInterpretedLteTime = function(test) {
	checkInterpretedOutput(test, "less/lteTime.pec");
};

exports.testTranspiledLteTime = function(test) {
	checkTranspiledOutput(test, "less/lteTime.pec");
};

