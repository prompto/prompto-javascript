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

exports.testAttribute = function(test) {
	checkOutput(test, "singleton/attribute.poc");
};

exports.testMember = function(test) {
	checkOutput(test, "singleton/member.poc");
};

