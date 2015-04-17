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

exports.testImmutable = function(test) {
	checkOutput(test, "mutability/immutable.poc");
};

exports.testMutable = function(test) {
	checkOutput(test, "mutability/mutable.poc");
};

