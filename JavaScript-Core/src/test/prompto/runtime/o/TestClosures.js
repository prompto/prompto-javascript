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

exports.testGlobalClosureNoArg = function(test) {
	checkOutput(test, "closures/globalClosureNoArg.poc");
};

exports.testGlobalClosureWithArg = function(test) {
	checkOutput(test, "closures/globalClosureWithArg.poc");
};

exports.testInstanceClosureNoArg = function(test) {
	checkOutput(test, "closures/instanceClosureNoArg.poc");
};

