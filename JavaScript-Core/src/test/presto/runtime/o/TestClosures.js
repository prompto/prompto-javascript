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
	checkOutput(test, "closures/globalClosureNoArg.o");
};

exports.testGlobalClosureWithArg = function(test) {
	checkOutput(test, "closures/globalClosureWithArg.o");
};

exports.testInstanceClosureNoArg = function(test) {
	checkOutput(test, "closures/instanceClosureNoArg.o");
};

