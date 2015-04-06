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

exports.testSelfAsParameter = function(test) {
	checkOutput(test, "self/selfAsParameter.poc");
};

exports.testSelfMember = function(test) {
	checkOutput(test, "self/selfMember.poc");
};

