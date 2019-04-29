require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedLtCharacter = function(test) {
	checkInterpretedOutput(test, "less/ltCharacter.poc");
};

exports.testTranspiledLtCharacter = function(test) {
	checkTranspiledOutput(test, "less/ltCharacter.poc");
};

exports.testInterpretedLtDate = function(test) {
	checkInterpretedOutput(test, "less/ltDate.poc");
};

exports.testTranspiledLtDate = function(test) {
	checkTranspiledOutput(test, "less/ltDate.poc");
};

exports.testInterpretedLtDateTime = function(test) {
	checkInterpretedOutput(test, "less/ltDateTime.poc");
};

exports.testTranspiledLtDateTime = function(test) {
	checkTranspiledOutput(test, "less/ltDateTime.poc");
};

exports.testInterpretedLtDecimal = function(test) {
	checkInterpretedOutput(test, "less/ltDecimal.poc");
};

exports.testTranspiledLtDecimal = function(test) {
	checkTranspiledOutput(test, "less/ltDecimal.poc");
};

exports.testInterpretedLtInteger = function(test) {
	checkInterpretedOutput(test, "less/ltInteger.poc");
};

exports.testTranspiledLtInteger = function(test) {
	checkTranspiledOutput(test, "less/ltInteger.poc");
};

exports.testInterpretedLtText = function(test) {
	checkInterpretedOutput(test, "less/ltText.poc");
};

exports.testTranspiledLtText = function(test) {
	checkTranspiledOutput(test, "less/ltText.poc");
};

exports.testInterpretedLtTime = function(test) {
	checkInterpretedOutput(test, "less/ltTime.poc");
};

exports.testTranspiledLtTime = function(test) {
	checkTranspiledOutput(test, "less/ltTime.poc");
};

exports.testInterpretedLtVersion = function(test) {
	checkInterpretedOutput(test, "less/ltVersion.poc");
};

exports.testTranspiledLtVersion = function(test) {
	checkTranspiledOutput(test, "less/ltVersion.poc");
};

exports.testInterpretedLteCharacter = function(test) {
	checkInterpretedOutput(test, "less/lteCharacter.poc");
};

exports.testTranspiledLteCharacter = function(test) {
	checkTranspiledOutput(test, "less/lteCharacter.poc");
};

exports.testInterpretedLteDate = function(test) {
	checkInterpretedOutput(test, "less/lteDate.poc");
};

exports.testTranspiledLteDate = function(test) {
	checkTranspiledOutput(test, "less/lteDate.poc");
};

exports.testInterpretedLteDateTime = function(test) {
	checkInterpretedOutput(test, "less/lteDateTime.poc");
};

exports.testTranspiledLteDateTime = function(test) {
	checkTranspiledOutput(test, "less/lteDateTime.poc");
};

exports.testInterpretedLteDecimal = function(test) {
	checkInterpretedOutput(test, "less/lteDecimal.poc");
};

exports.testTranspiledLteDecimal = function(test) {
	checkTranspiledOutput(test, "less/lteDecimal.poc");
};

exports.testInterpretedLteInteger = function(test) {
	checkInterpretedOutput(test, "less/lteInteger.poc");
};

exports.testTranspiledLteInteger = function(test) {
	checkTranspiledOutput(test, "less/lteInteger.poc");
};

exports.testInterpretedLteText = function(test) {
	checkInterpretedOutput(test, "less/lteText.poc");
};

exports.testTranspiledLteText = function(test) {
	checkTranspiledOutput(test, "less/lteText.poc");
};

exports.testInterpretedLteTime = function(test) {
	checkInterpretedOutput(test, "less/lteTime.poc");
};

exports.testTranspiledLteTime = function(test) {
	checkTranspiledOutput(test, "less/lteTime.poc");
};

