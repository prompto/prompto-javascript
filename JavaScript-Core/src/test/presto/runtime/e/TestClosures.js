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
	checkOutput(test, "closures/globalClosureNoArg.e");
};

exports.testGlobalClosureWithArg = function(test) {
	checkOutput(test, "closures/globalClosureWithArg.e");
};

exports.testInstanceClosureNoArg = function(test) {
	checkOutput(test, "closures/instanceClosureNoArg.e");
};

