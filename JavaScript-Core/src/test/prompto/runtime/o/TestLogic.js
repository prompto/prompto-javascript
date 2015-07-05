// generated: 2015-07-05T23:01:02.110
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

exports.testAndBoolean = function(test) {
	checkOutput(test, "logic/andBoolean.poc");
};

exports.testNotBoolean = function(test) {
	checkOutput(test, "logic/notBoolean.poc");
};

exports.testOrBoolean = function(test) {
	checkOutput(test, "logic/orBoolean.poc");
};

