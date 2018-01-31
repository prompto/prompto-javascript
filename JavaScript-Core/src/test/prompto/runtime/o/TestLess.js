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
	checkOutput(test, "less/ltCharacter.poc");
};

exports.testLtDate = function(test) {
	checkOutput(test, "less/ltDate.poc");
};

exports.testLtDateTime = function(test) {
	checkOutput(test, "less/ltDateTime.poc");
};

exports.testLtDecimal = function(test) {
	checkOutput(test, "less/ltDecimal.poc");
};

exports.testLtInteger = function(test) {
	checkOutput(test, "less/ltInteger.poc");
};

exports.testLtText = function(test) {
	checkOutput(test, "less/ltText.poc");
};

exports.testLtTime = function(test) {
	checkOutput(test, "less/ltTime.poc");
};

exports.testLtVersion = function(test) {
	checkOutput(test, "less/ltVersion.poc");
};

exports.testLteCharacter = function(test) {
	checkOutput(test, "less/lteCharacter.poc");
};

exports.testLteDate = function(test) {
	checkOutput(test, "less/lteDate.poc");
};

exports.testLteDateTime = function(test) {
	checkOutput(test, "less/lteDateTime.poc");
};

exports.testLteDecimal = function(test) {
	checkOutput(test, "less/lteDecimal.poc");
};

exports.testLteInteger = function(test) {
	checkOutput(test, "less/lteInteger.poc");
};

exports.testLteText = function(test) {
	checkOutput(test, "less/lteText.poc");
};

exports.testLteTime = function(test) {
	checkOutput(test, "less/lteTime.poc");
};

