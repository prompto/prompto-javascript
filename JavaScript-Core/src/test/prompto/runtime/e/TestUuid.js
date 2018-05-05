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

exports.testInterpretedUuid = function(test) {
	checkInterpretedOutput(test, "uuid/uuid.pec");
};

exports.testTranspiledUuid = function(test) {
	checkTranspiledOutput(test, "uuid/uuid.pec");
};

