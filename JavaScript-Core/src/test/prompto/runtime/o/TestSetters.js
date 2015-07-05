// generated: 2015-07-05T23:01:02.178
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

exports.testGetter = function(test) {
	checkOutput(test, "setters/getter.poc");
};

exports.testSetter = function(test) {
	checkOutput(test, "setters/setter.poc");
};

