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

exports.testInterpretedAttribute = function(test) {
	checkInterpretedOutput(test, "singleton/attribute.pec");
};

exports.testTranspiledAttribute = function(test) {
	checkTranspiledOutput(test, "singleton/attribute.pec");
};

exports.testInterpretedMember = function(test) {
	checkInterpretedOutput(test, "singleton/member.pec");
};

exports.testTranspiledMember = function(test) {
	checkTranspiledOutput(test, "singleton/member.pec");
};

