// generated: 2015-07-05T23:01:02.182
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

exports.testAttribute = function(test) {
	checkOutput(test, "singleton/attribute.pec");
};

exports.testMember = function(test) {
	checkOutput(test, "singleton/member.pec");
};

