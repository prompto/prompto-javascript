// generated: 2015-07-05T23:01:02.008
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

exports.testGlobalClosureNoArg = function(test) {
	checkOutput(test, "closures/globalClosureNoArg.pec");
};

exports.testGlobalClosureWithArg = function(test) {
	checkOutput(test, "closures/globalClosureWithArg.pec");
};

exports.testInstanceClosureNoArg = function(test) {
	checkOutput(test, "closures/instanceClosureNoArg.pec");
};

