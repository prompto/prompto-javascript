// generated: 2015-07-05T23:01:02.069
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

exports.testForward = function(test) {
	checkOutput(test, "forward/forward.pec");
};

