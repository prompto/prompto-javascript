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

exports.testInterpretedUuid = function(test) {
	checkInterpretedOutput(test, "uuid/uuid.poc");
};

exports.testTranspiledUuid = function(test) {
	checkTranspiledOutput(test, "uuid/uuid.poc");
};

