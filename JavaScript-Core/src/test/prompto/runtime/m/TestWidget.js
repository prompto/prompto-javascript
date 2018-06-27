require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedMinimal = function(test) {
	checkInterpretedOutput(test, "widget/minimal.pmc");
};

exports.testTranspiledMinimal = function(test) {
	checkTranspiledOutput(test, "widget/minimal.pmc");
};

