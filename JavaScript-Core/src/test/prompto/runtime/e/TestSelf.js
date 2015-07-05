// generated: 2015-07-05T23:01:02.168
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

exports.testSelfAsParameter = function(test) {
	checkOutput(test, "self/selfAsParameter.pec");
};

exports.testSelfMember = function(test) {
	checkOutput(test, "self/selfMember.pec");
};

