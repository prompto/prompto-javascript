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

exports.testInterpretedAddInteger = function(test) {
	checkInterpretedOutput(test, "add/addInteger.pmc");
};

exports.testTranspiledAddInteger = function(test) {
	checkTranspiledOutput(test, "add/addInteger.pmc");
};

